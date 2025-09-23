-- StudyConnect Database Script
-- SQL Server

-- Criar banco de dados
CREATE DATABASE StudyConnectDB;
GO

USE StudyConnectDB;
GO

-- Tabela de Categorias
CREATE TABLE categorias (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    descricao NVARCHAR(255),
    cor NVARCHAR(7) DEFAULT '#007bff'
);

-- Tabela de Professores
CREATE TABLE professores (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    especialidade NVARCHAR(100),
    bio NVARCHAR(500),
    foto_url NVARCHAR(255),
    experiencia INT DEFAULT 0,
    avaliacao DECIMAL(3,2) DEFAULT 5.0
);

-- Tabela de Cursos
CREATE TABLE cursos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(150) NOT NULL,
    descricao NVARCHAR(500),
    categoria_id INT,
    professor_id INT,
    duracao INT, -- em horas
    nivel NVARCHAR(20) DEFAULT 'Iniciante',
    preco DECIMAL(10,2) DEFAULT 0.00,
    imagem_url NVARCHAR(255),
    ativo BIT DEFAULT 1,
    data_criacao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (professor_id) REFERENCES professores(id)
);

-- Tabela de Contatos
CREATE TABLE contatos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    assunto NVARCHAR(150),
    mensagem NVARCHAR(1000) NOT NULL,
    data_envio DATETIME DEFAULT GETDATE(),
    respondido BIT DEFAULT 0
);

-- Inserir dados de exemplo

-- Categorias
INSERT INTO categorias (nome, descricao, cor) VALUES
('Frontend', 'Desenvolvimento de interfaces web', '#e74c3c'),
('Backend', 'Desenvolvimento de servidores e APIs', '#3498db'),
('Matemática', 'Cursos de matemática básica e avançada', '#f39c12'),
('Português', 'Língua portuguesa e literatura', '#27ae60');

-- Professores
INSERT INTO professores (nome, email, especialidade, bio, foto_url, experiencia, avaliacao) VALUES
('Maria Silva', 'maria.silva@studyconnect.com', 'Frontend Developer', 'Especialista em React, Vue.js e desenvolvimento web moderno', 'images/profa.jpg', 8, 4.9),
('Carlos Souza', 'carlos.souza@studyconnect.com', 'Backend Developer', 'Expert em Java, Spring Boot e arquitetura de microsserviços', 'images/Carlos.jpg', 12, 4.8),
('Ana Costa', 'ana.costa@studyconnect.com', 'Professora de Matemática', 'Doutora em Matemática com foco em ensino didático', 'images/profmat.jpg', 15, 4.9),
('João Santos', 'joao.santos@studyconnect.com', 'Professor de Português', 'Mestre em Letras e especialista em gramática', 'images/profmat.jpg', 10, 4.7);

-- Cursos
INSERT INTO cursos (titulo, descricao, categoria_id, professor_id, duracao, nivel, preco, imagem_url) VALUES
('HTML e CSS Moderno', 'Aprenda a criar sites responsivos com HTML5 e CSS3', 1, 1, 40, 'Iniciante', 199.90, 'images/capa-front-end.jpg'),
('JavaScript Avançado', 'Domine JavaScript ES6+ e frameworks modernos', 1, 1, 60, 'Intermediário', 299.90, 'images/capa-front-end.jpg'),
('Spring Boot Completo', 'Desenvolvimento de APIs REST com Spring Boot', 2, 2, 80, 'Intermediário', 399.90, 'images/17f7d622-3a54-480e-be53-5dd7296bddce_desenvolvedor+backend.avif'),
('Node.js e Express', 'Backend moderno com Node.js e Express', 2, 2, 50, 'Iniciante', 249.90, 'images/17f7d622-3a54-480e-be53-5dd7296bddce_desenvolvedor+backend.avif'),
('Matemática Básica', 'Fundamentos de matemática para o dia a dia', 3, 3, 30, 'Iniciante', 149.90, 'images/capa-matematicawebp.webp'),
('Álgebra Linear', 'Conceitos avançados de álgebra linear', 3, 3, 45, 'Avançado', 199.90, 'images/capa-matematicawebp.webp'),
('Gramática Portuguesa', 'Domine a gramática da língua portuguesa', 4, 4, 35, 'Iniciante', 179.90, 'images/dia-mundial-da-lingua-portuguesa-momento-para-se-aperfeicoar-no-idioma.jpeg'),
('Literatura Brasileira', 'Principais obras da literatura nacional', 4, 4, 40, 'Intermediário', 189.90, 'images/dia-mundial-da-lingua-portuguesa-momento-para-se-aperfeicoar-no-idioma.jpeg');

-- Dados de exemplo para contatos
INSERT INTO contatos (nome, email, assunto, mensagem) VALUES
('Pedro Oliveira', 'pedro@email.com', 'Dúvida sobre curso', 'Gostaria de saber mais sobre o curso de JavaScript'),
('Ana Ferreira', 'ana@email.com', 'Sugestão', 'Poderiam adicionar um curso de Python?'),
('Lucas Lima', 'lucas@email.com', 'Problema técnico', 'Não consigo acessar minha conta');

GO