-- StudyConnect+ Database
CREATE DATABASE StudyConnect;
GO
USE StudyConnect;
GO

-- Usuários
CREATE TABLE usuarios (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    senha NVARCHAR(255) NOT NULL,
    tipo NVARCHAR(20) DEFAULT 'ALUNO',
    avatar NVARCHAR(500),
    ativo BIT DEFAULT 1,
    criado_em DATETIME2 DEFAULT GETDATE()
);

-- Categorias
CREATE TABLE categorias (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(50) NOT NULL,
    icone NVARCHAR(50),
    cor NVARCHAR(7) DEFAULT '#667eea'
);

-- Professores
CREATE TABLE professores (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    usuario_id BIGINT FOREIGN KEY REFERENCES usuarios(id),
    especialidade NVARCHAR(100),
    biografia NVARCHAR(MAX),
    avaliacao DECIMAL(3,2) DEFAULT 0,
    total_alunos INT DEFAULT 0,
    online BIT DEFAULT 0,
    linkedin NVARCHAR(200),
    github NVARCHAR(200)
);

-- Cursos
CREATE TABLE cursos (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(100) NOT NULL,
    descricao NVARCHAR(MAX),
    professor_id BIGINT FOREIGN KEY REFERENCES professores(id),
    categoria_id BIGINT FOREIGN KEY REFERENCES categorias(id),
    nivel NVARCHAR(20) DEFAULT 'INICIANTE',
    duracao_horas INT DEFAULT 0,
    avaliacao DECIMAL(3,2) DEFAULT 0,
    total_alunos INT DEFAULT 0,
    popular BIT DEFAULT 0,
    imagem NVARCHAR(500),
    ativo BIT DEFAULT 1
);

-- Contatos
CREATE TABLE contatos (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    assunto NVARCHAR(200) NOT NULL,
    mensagem NVARCHAR(MAX) NOT NULL,
    criado_em DATETIME2 DEFAULT GETDATE()
);

-- Dados iniciais
INSERT INTO categorias (nome, icone, cor) VALUES
('Frontend', 'fas fa-code', '#4facfe'),
('Backend', 'fas fa-server', '#43e97b'),
('Matemática', 'fas fa-calculator', '#667eea'),
('Português', 'fas fa-book', '#764ba2');

INSERT INTO usuarios (nome, email, senha, tipo, avatar) VALUES
('Maria Silva', 'maria@email.com', '123456', 'PROFESSOR', '/images/profa.jpg'),
('Carlos Souza', 'carlos@email.com', '123456', 'PROFESSOR', '/images/Carlos.jpg'),
('Ana Lima', 'ana@email.com', '123456', 'PROFESSOR', '/images/geha_blog-janeiro-2024-09-1.jpg'),
('João Pereira', 'joao@email.com', '123456', 'PROFESSOR', '/images/profmat.jpg');

INSERT INTO professores (usuario_id, especialidade, biografia, avaliacao, total_alunos, online, linkedin, github) VALUES
(1, 'Frontend & UX/UI', 'Especialista em React e design moderno. +8 anos de experiência.', 4.9, 450, 1, 'https://linkedin.com/in/maria-silva', 'https://github.com/maria-silva'),
(2, 'Backend & DevOps', 'Expert em Node.js e microsserviços. +10 anos de experiência.', 4.8, 320, 1, 'https://linkedin.com/in/carlos-souza', 'https://github.com/carlos-souza'),
(3, 'Português & Literatura', 'Mestre em Letras, especialista em gramática. +8 anos ensinando.', 4.9, 580, 0, 'https://linkedin.com/in/ana-lima', NULL),
(4, 'Matemática Aplicada', 'PhD em Matemática, especialista em álgebra. +10 anos de experiência.', 4.7, 290, 1, 'https://linkedin.com/in/joao-pereira', NULL);

INSERT INTO cursos (titulo, descricao, professor_id, categoria_id, nivel, duracao_horas, avaliacao, total_alunos, popular, imagem) VALUES
('Frontend Moderno', 'HTML5, CSS3, JavaScript e React. Interfaces modernas e responsivas.', 1, 1, 'Iniciante', 40, 4.9, 450, 1, 'images/capa-front-end.jpg'),
('Backend Avançado', 'APIs com Node.js, bancos de dados e arquiteturas escaláveis.', 2, 2, 'Avançado', 60, 4.8, 320, 1, 'images/17f7d622-3a54-480e-be53-5dd7296bddce_desenvolvedor+backend.avif'),
('Português', 'Gramática, redação e interpretação. Prepare-se para concursos.', 3, 4, 'Básico', 40, 4.9, 580, 0, 'images/dia-mundial-da-lingua-portuguesa-momento-para-se-aperfeicoar-no-idioma.jpeg'),
('Matemática', 'Álgebra, geometria, cálculo. Matemática prática e aplicada.', 4, 3, 'Intermediário', 45, 4.7, 290, 0, 'images/capa-matematicawebp.webp');

PRINT 'Database criado com sucesso!';