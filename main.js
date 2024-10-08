const { app, BrowserWindow } = require('electron');
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

// Configuração do Express
const expressApp = express();
expressApp.use(express.json());
expressApp.use(express.static(__dirname)); // Servir arquivos estáticos da raiz
const port = 3000; // Porta para o servidor Express

// Configuração da conexão com o MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'HotelM'
};

// Rota para autenticação de login
expressApp.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  console.log('Recebido pedido de login para:', email);

  try {
    const connection = await mysql.createConnection(dbConfig);
    const chaveSecreta = '526F79616c506c616365000000000000';
    const [rows] = await connection.execute('SELECT * FROM funcionario WHERE Nome = ? AND AES_DECRYPT(Senha, UNHEX(?)) = ?', [email, chaveSecreta, senha]);
    await connection.end();

    if (rows.length > 0) {
        console.log('Login bem-sucedido para:', email);
        res.json({ success: true, message: 'Login bem-sucedido' });
      } else {
        console.log('Login falhou para:', email);
        res.json({ success: false, message: 'Usuário ou senha incorretos' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Erro ao autenticar usuário' });
    }
  });
  
  // Iniciar o servidor Express
  expressApp.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
  });
  
  // Função para carregar a janela principal
  function carregar_janela() {
    const mainWindow = new BrowserWindow({
      width: 1000,
      height: 800, // Ajustar a altura da janela
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });
  
    mainWindow.loadFile(path.join(__dirname, 'index.html')); // Corrigido o caminho
    // mainWindow.webContents.openDevTools(); // Comentado para não abrir as ferramentas de desenvolvedor
  }
  
  app.on('ready', carregar_janela);
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      carregar_janela();
    }
  });
  
