-- Criação do Banco de Dados StudyConnect+
CREATE DATABASE StudyConnectPlus;
GO

USE StudyConnectPlus;
GO

-- Tabela de Usuários
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    senha NVARCHAR(255) NOT NULL,
    tipo NVARCHAR(20) CHECK (tipo IN ('aluno', 'professor', 'admin')) DEFAULT 'aluno',
    data_cadastro DATETIME DEFAULT GETDATE(),
    ativo BIT DEFAULT 1
);

-- Tabela de Professores
CREATE TABLE professores (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT FOREIGN KEY REFERENCES usuarios(id),
    especialidade NVARCHAR(100),
    biografia TEXT,
    avaliacao DECIMAL(3,2) DEFAULT 0,
    total_alunos INT DEFAULT 0,
    status_online BIT DEFAULT 0,
    linkedin NVARCHAR(200),
    github NVARCHAR(200)
);

-- Tabela de Categorias
CREATE TABLE categorias (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(50) NOT NULL,
    descricao TEXT,
    cor NVARCHAR(7) -- hex color
);

-- Tabela de Cursos
CREATE TABLE cursos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(200) NOT NULL,
    descricao TEXT,
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

-- Tabela de Aulas
CREATE TABLE aulas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    curso_id INT FOREIGN KEY REFERENCES cursos(id),
    titulo NVARCHAR(200) NOT NULL,
    descricao TEXT,
    video_url NVARCHAR(500),
    duracao_minutos INT,
    ordem INT,
    ativo BIT DEFAULT 1
);

-- Tabela de Matrículas
CREATE TABLE matriculas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    aluno_id INT FOREIGN KEY REFERENCES usuarios(id),
    curso_id INT FOREIGN KEY REFERENCES cursos(id),
    data_matricula DATETIME DEFAULT GETDATE(),
    progresso DECIMAL(5,2) DEFAULT 0,
    concluido BIT DEFAULT 0,
    data_conclusao DATETIME NULL
);

-- Tabela de Progresso das Aulas
CREATE TABLE progresso_aulas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    matricula_id INT FOREIGN KEY REFERENCES matriculas(id),
    aula_id INT FOREIGN KEY REFERENCES aulas(id),
    assistido BIT DEFAULT 0,
    tempo_assistido INT DEFAULT 0,
    data_visualizacao DATETIME NULL
);

-- Tabela de Avaliações
CREATE TABLE avaliacoes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    curso_id INT FOREIGN KEY REFERENCES cursos(id),
    aluno_id INT FOREIGN KEY REFERENCES usuarios(id),
    nota INT CHECK (nota BETWEEN 1 AND 5),
    comentario TEXT,
    data_avaliacao DATETIME DEFAULT GETDATE()
);

-- Inserir dados iniciais
INSERT INTO categorias (nome, descricao, cor) VALUES
('Frontend', 'Desenvolvimento de interfaces web', '#667eea'),
('Backend', 'Desenvolvimento de servidores e APIs', '#764ba2'),
('Matemática', 'Fundamentos matemáticos', '#43e97b'),
('Português', 'Língua portuguesa e literatura', '#f093fb');

-- Inserir usuários de exemplo
INSERT INTO usuarios (nome, email, senha, tipo) VALUES
('Maria Silva', 'maria@studyconnect.com', 'senha123', 'professor'),
('Carlos Souza', 'carlos@studyconnect.com', 'senha123', 'professor'),
('João Aluno', 'joao@email.com', 'senha123', 'aluno');

-- Inserir professores
INSERT INTO professores (usuario_id, especialidade, biografia, avaliacao, total_alunos, status_online) VALUES
(1, 'Frontend & UX/UI', 'Especialista em React, Vue.js e design de interfaces modernas', 4.9, 1250, 1),
(2, 'Backend & DevOps', 'Expert em Node.js, Python e arquitetura de sistemas', 4.8, 980, 0);

-- Inserir cursos
INSERT INTO cursos (titulo, descricao, professor_id, categoria_id, preco, nivel, duracao_horas, popular, avaliacao, total_alunos) VALUES
('Frontend Moderno', 'Aprenda React, Vue.js e as mais modernas tecnologias frontend', 1, 1, 299.90, 'intermediario', 40, 1, 4.9, 1250),
('Backend Avançado', 'Node.js, APIs REST, bancos de dados e deploy', 2, 2, 399.90, 'avancado', 60, 1, 4.8, 980),
('Matemática Básica', 'Fundamentos matemáticos essenciais', 1, 3, 199.90, 'iniciante', 30, 0, 4.7, 650),
('Português Completo', 'Gramática, redação e interpretação de textos', 2, 4, 249.90, 'intermediario', 35, 0, 4.6, 420);