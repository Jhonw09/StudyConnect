-- Tabelas principais do StudyConnect
USE StudyConnect;
GO

-- Tabela de usuários
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    senha NVARCHAR(255) NOT NULL,
    tipo NVARCHAR(20) CHECK (tipo IN ('aluno', 'professor', 'admin')) NOT NULL,
    data_criacao DATETIME2 DEFAULT GETDATE(),
    ativo BIT DEFAULT 1
);

-- Tabela de professores
CREATE TABLE professores (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT FOREIGN KEY REFERENCES usuarios(id),
    especialidade NVARCHAR(100),
    biografia NTEXT,
    avaliacao DECIMAL(3,2) DEFAULT 0,
    total_alunos INT DEFAULT 0,
    status_online BIT DEFAULT 0,
    linkedin NVARCHAR(200),
    github NVARCHAR(200)
);

-- Tabela de categorias
CREATE TABLE categorias (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(50) NOT NULL,
    descricao NVARCHAR(200),
    cor NVARCHAR(7) -- hex color
);

-- Tabela de cursos
CREATE TABLE cursos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(100) NOT NULL,
    descricao NTEXT,
    professor_id INT FOREIGN KEY REFERENCES professores(id),
    categoria_id INT FOREIGN KEY REFERENCES categorias(id),
    preco DECIMAL(10,2),
    nivel NVARCHAR(20) CHECK (nivel IN ('iniciante', 'intermediario', 'avancado')),
    duracao_horas INT,
    avaliacao DECIMAL(3,2) DEFAULT 0,
    total_alunos INT DEFAULT 0,
    popular BIT DEFAULT 0,
    imagem_url NVARCHAR(500),
    data_criacao DATETIME2 DEFAULT GETDATE(),
    ativo BIT DEFAULT 1
);

-- Tabela de tecnologias
CREATE TABLE tecnologias (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(50) NOT NULL,
    icone NVARCHAR(100)
);

-- Tabela de relacionamento curso-tecnologia
CREATE TABLE curso_tecnologias (
    curso_id INT FOREIGN KEY REFERENCES cursos(id),
    tecnologia_id INT FOREIGN KEY REFERENCES tecnologias(id),
    PRIMARY KEY (curso_id, tecnologia_id)
);

-- Tabela de matrículas
CREATE TABLE matriculas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT FOREIGN KEY REFERENCES usuarios(id),
    curso_id INT FOREIGN KEY REFERENCES cursos(id),
    data_matricula DATETIME2 DEFAULT GETDATE(),
    progresso DECIMAL(5,2) DEFAULT 0,
    concluido BIT DEFAULT 0,
    avaliacao INT CHECK (avaliacao BETWEEN 1 AND 5)
);

-- Tabela de contatos
CREATE TABLE contatos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    assunto NVARCHAR(200) NOT NULL,
    mensagem NTEXT NOT NULL,
    data_envio DATETIME2 DEFAULT GETDATE(),
    respondido BIT DEFAULT 0
);