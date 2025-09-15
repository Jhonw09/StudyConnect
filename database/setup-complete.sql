-- Script completo para configurar StudyConnect+ no SQL Server
USE master;
GO

-- Criar banco se não existir
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'StudyConnectPlus')
BEGIN
    CREATE DATABASE StudyConnectPlus;
END
GO

USE StudyConnectPlus;
GO

-- Tabelas
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='usuarios' AND xtype='U')
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    senha NVARCHAR(255) NOT NULL,
    tipo NVARCHAR(20) CHECK (tipo IN ('aluno', 'professor', 'admin')) DEFAULT 'aluno',
    data_cadastro DATETIME DEFAULT GETDATE(),
    ativo BIT DEFAULT 1
);

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='categorias' AND xtype='U')
CREATE TABLE categorias (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(50) NOT NULL,
    descricao NVARCHAR(MAX),
    cor NVARCHAR(7)
);

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='professores' AND xtype='U')
CREATE TABLE professores (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT FOREIGN KEY REFERENCES usuarios(id),
    especialidade NVARCHAR(100),
    biografia NVARCHAR(MAX),
    avaliacao DECIMAL(3,2) DEFAULT 0,
    total_alunos INT DEFAULT 0,
    status_online BIT DEFAULT 0,
    linkedin NVARCHAR(200),
    github NVARCHAR(200)
);

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='cursos' AND xtype='U')
CREATE TABLE cursos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(200) NOT NULL,
    descricao NVARCHAR(MAX),
    professor_id INT FOREIGN KEY REFERENCES professores(id),
    categoria_id INT FOREIGN KEY REFERENCES categorias(id),
    preco DECIMAL(10,2) DEFAULT 0,
    nivel NVARCHAR(20) CHECK (nivel IN ('iniciante', 'intermediario', 'avancado')),
    duracao_horas INT,
    imagem_url NVARCHAR(500),
    popular BIT DEFAULT 0,
    avaliacao DECIMAL(3,2) DEFAULT 0,
    total_alunos INT DEFAULT 0,
    data_criacao DATETIME DEFAULT GETDATE(),
    ativo BIT DEFAULT 1
);

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='aulas' AND xtype='U')
CREATE TABLE aulas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    curso_id INT FOREIGN KEY REFERENCES cursos(id),
    titulo NVARCHAR(200) NOT NULL,
    descricao NVARCHAR(MAX),
    video_url NVARCHAR(500),
    duracao_minutos INT,
    ordem INT,
    ativo BIT DEFAULT 1
);

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='matriculas' AND xtype='U')
CREATE TABLE matriculas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    aluno_id INT FOREIGN KEY REFERENCES usuarios(id),
    curso_id INT FOREIGN KEY REFERENCES cursos(id),
    data_matricula DATETIME DEFAULT GETDATE(),
    progresso DECIMAL(5,2) DEFAULT 0,
    concluido BIT DEFAULT 0,
    data_conclusao DATETIME NULL
);

-- Limpar dados existentes
DELETE FROM cursos;
DELETE FROM professores;
DELETE FROM usuarios;
DELETE FROM categorias;

-- Inserir dados
INSERT INTO categorias (nome, descricao, cor) VALUES
('Frontend', 'Desenvolvimento de interfaces web', '#667eea'),
('Backend', 'Desenvolvimento de servidores e APIs', '#764ba2'),
('Matemática', 'Fundamentos matemáticos', '#43e97b'),
('Português', 'Língua portuguesa e literatura', '#f093fb');

INSERT INTO usuarios (nome, email, senha, tipo) VALUES
('Maria Silva', 'maria@studyconnect.com', '123456', 'professor'),
('Carlos Souza', 'carlos@studyconnect.com', '123456', 'professor'),
('João Aluno', 'joao@email.com', '123456', 'aluno'),
('Admin', 'admin@studyconnect.com', '123456', 'admin');

INSERT INTO professores (usuario_id, especialidade, biografia, avaliacao, total_alunos, status_online) VALUES
(1, 'Frontend & UX/UI', 'Especialista em React, Vue.js e design de interfaces modernas', 4.9, 1250, 1),
(2, 'Backend & DevOps', 'Expert em Node.js, Python e arquitetura de sistemas', 4.8, 980, 0);

INSERT INTO cursos (titulo, descricao, professor_id, categoria_id, preco, nivel, duracao_horas, popular, avaliacao, total_alunos, imagem_url) VALUES
('Frontend Moderno', 'Aprenda React, Vue.js e as mais modernas tecnologias frontend', 1, 1, 299.90, 'intermediario', 40, 1, 4.9, 1250, 'images/capa-front-end.jpg'),
('Backend Avançado', 'Node.js, APIs REST, bancos de dados e deploy', 2, 2, 399.90, 'avancado', 60, 1, 4.8, 980, 'images/17f7d622-3a54-480e-be53-5dd7296bddce_desenvolvedor+backend.avif'),
('Matemática Básica', 'Fundamentos matemáticos essenciais', 1, 3, 199.90, 'iniciante', 30, 0, 4.7, 650, 'images/capa-matematicawebp.webp'),
('Português Completo', 'Gramática, redação e interpretação de textos', 2, 4, 249.90, 'intermediario', 35, 0, 4.6, 420, 'images/dia-mundial-da-lingua-portuguesa-momento-para-se-aperfeicoar-no-idioma.jpeg');

-- Procedures
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_AutenticarUsuario')
DROP PROCEDURE sp_AutenticarUsuario;
GO

CREATE PROCEDURE sp_AutenticarUsuario
    @email NVARCHAR(100),
    @senha NVARCHAR(255)
AS
BEGIN
    SELECT u.id, u.nome, u.email, u.tipo, p.id as professor_id
    FROM usuarios u
    LEFT JOIN professores p ON u.id = p.usuario_id
    WHERE u.email = @email AND u.senha = @senha AND u.ativo = 1;
END;
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_ObterCursosPorCategoria')
DROP PROCEDURE sp_ObterCursosPorCategoria;
GO

CREATE PROCEDURE sp_ObterCursosPorCategoria
    @categoria_id INT = NULL
AS
BEGIN
    SELECT c.*, cat.nome as categoria_nome, u.nome as professor_nome, p.avaliacao as professor_avaliacao
    FROM cursos c
    INNER JOIN categorias cat ON c.categoria_id = cat.id
    INNER JOIN professores p ON c.professor_id = p.id
    INNER JOIN usuarios u ON p.usuario_id = u.id
    WHERE (@categoria_id IS NULL OR c.categoria_id = @categoria_id) AND c.ativo = 1
    ORDER BY c.popular DESC, c.avaliacao DESC;
END;
GO

PRINT 'Banco StudyConnectPlus configurado com sucesso!';