CREATE DATABASE bancoteste1;
USE bancoteste1;

CREATE TABLE funcionarios (
    codigo INT PRIMARY KEY identity,
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(100)
);

INSERT INTO funcionarios (email, senha) VALUES
('usuario1@example.com', 'senha1'),
('usuario2@example.com', 'senha2');


select*from funcionarios 

