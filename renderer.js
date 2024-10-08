async function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, senha })
  });

  const result = await response.json();
  const messageElement = document.getElementById('message');

  if (result.success) {
    messageElement.textContent = 'Login bem-sucedido';
    messageElement.style.color = 'green';
    localStorage.setItem('user', email);
    window.location.href = 'Pag2.html'; // Redireciona para Pag2.html
  } else {
    messageElement.textContent = 'Usuário ou senha incorretos';
    messageElement.style.color = 'red';
  }
}
