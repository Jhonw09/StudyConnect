-- =============================================
-- StudyConnect+ - Criar Tabelas
-- Execute após 01_create_database.sql
-- =============================================

USE StudyConnect;
GO

-- Usuários
CREATE TABLE usuarios (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    senha NVARCHAR(255) NOT NULL,
    tipo NVARCHAR(20) CHECK (tipo IN ('ALUNO', 'PROFESSOR', 'ADMIN')) DEFAULT 'ALUNO',
    avatar NVARCHAR(500),
    telefone NVARCHAR(20),
    ativo BIT DEFAULT 1,
    criado_em DATETIME2 DEFAULT GETDATE()
);

-- Categorias
CREATE TABLE categorias (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(50) NOT NULL UNIQUE,
    descricao NVARCHAR(200),
    icone NVARCHAR(50),
    cor NVARCHAR(7) DEFAULT '#667eea',
    ativo BIT DEFAULT 1
);

-- Professores
CREATE TABLE professores (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    usuario_id BIGINT FOREIGN KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    especialidade NVARCHAR(100),
    biografia NTEXT,
    avaliacao DECIMAL(3,2) DEFAULT 0,
    total_alunos INT DEFAULT 0,
    total_cursos INT DEFAULT 0,
    online BIT DEFAULT 0,
    linkedin NVARCHAR(200),
    github NVARCHAR(200),
    website NVARCHAR(200),
    aprovado BIT DEFAULT 1
);

-- Cursos
CREATE TABLE cursos (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(100) NOT NULL,
    descricao NTEXT,
    professor_id BIGINT FOREIGN KEY REFERENCES professores(id),
    categoria_id BIGINT FOREIGN KEY REFERENCES categorias(id),
    preco DECIMAL(10,2) DEFAULT 0,
    nivel NVARCHAR(20) CHECK (nivel IN ('INICIANTE', 'INTERMEDIARIO', 'AVANCADO')) DEFAULT 'INICIANTE',
    duracao_horas INT DEFAULT 0,
    total_aulas INT DEFAULT 0,
    avaliacao DECIMAL(3,2) DEFAULT 0,
    total_avaliacoes INT DEFAULT 0,
    total_alunos INT DEFAULT 0,
    popular BIT DEFAULT 0,
    destaque BIT DEFAULT 0,
    imagem NVARCHAR(500),
    ativo BIT DEFAULT 1,
    criado_em DATETIME2 DEFAULT GETDATE()
);

-- Aulas
CREATE TABLE aulas (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    curso_id BIGINT FOREIGN KEY REFERENCES cursos(id) ON DELETE CASCADE,
    titulo NVARCHAR(100) NOT NULL,
    descricao NTEXT,
    video_url NVARCHAR(500),
    duracao_minutos INT DEFAULT 0,
    ordem INT NOT NULL,
    gratuita BIT DEFAULT 0,
    ativo BIT DEFAULT 1
);

-- Tecnologias
CREATE TABLE tecnologias (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(50) NOT NULL UNIQUE,
    icone NVARCHAR(100),
    cor NVARCHAR(7) DEFAULT '#667eea',
    ativo BIT DEFAULT 1
);

-- Curso-Tecnologias (relacionamento)
CREATE TABLE curso_tecnologias (
    curso_id BIGINT FOREIGN KEY REFERENCES cursos(id) ON DELETE CASCADE,
    tecnologia_id BIGINT FOREIGN KEY REFERENCES tecnologias(id),
    PRIMARY KEY (curso_id, tecnologia_id)
);

-- Matrículas
CREATE TABLE matriculas (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    usuario_id BIGINT FOREIGN KEY REFERENCES usuarios(id),
    curso_id BIGINT FOREIGN KEY REFERENCES cursos(id),
    progresso DECIMAL(5,2) DEFAULT 0,
    concluido BIT DEFAULT 0,
    data_matricula DATETIME2 DEFAULT GETDATE(),
    data_conclusao DATETIME2
);

-- Progresso das aulas
CREATE TABLE progresso_aulas (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    matricula_id BIGINT FOREIGN KEY REFERENCES matriculas(id) ON DELETE CASCADE,
    aula_id BIGINT FOREIGN KEY REFERENCES aulas(id),
    assistido BIT DEFAULT 0,
    tempo_assistido INT DEFAULT 0,
    data_conclusao DATETIME2,
    UNIQUE(matricula_id, aula_id)
);

-- Contatos
CREATE TABLE contatos (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    telefone NVARCHAR(20),
    assunto NVARCHAR(200) NOT NULL,
    mensagem NTEXT NOT NULL,
    tipo NVARCHAR(20) DEFAULT 'GERAL',
    respondido BIT DEFAULT 0,
    resposta NTEXT,
    data_resposta DATETIME2,
    criado_em DATETIME2 DEFAULT GETDATE()
);

-- Jogos/Quiz
CREATE TABLE jogos (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    tipo NVARCHAR(50) CHECK (tipo IN ('QUIZ', 'DIGITACAO', 'OUTROS')),
    descricao NTEXT,
    icone NVARCHAR(50),
    url NVARCHAR(200),
    nivel NVARCHAR(20) DEFAULT 'FACIL',
    tempo_limite INT DEFAULT 0,
    ativo BIT DEFAULT 1
);

-- Resultados dos jogos
CREATE TABLE resultados_jogos (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    usuario_id BIGINT FOREIGN KEY REFERENCES usuarios(id),
    jogo_id BIGINT FOREIGN KEY REFERENCES jogos(id),
    pontuacao INT DEFAULT 0,
    tempo_segundos INT DEFAULT 0,
    acertos INT DEFAULT 0,
    erros INT DEFAULT 0,
    data_jogo DATETIME2 DEFAULT GETDATE()
);

-- Avaliações de cursos
CREATE TABLE avaliacoes_cursos (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    usuario_id BIGINT FOREIGN KEY REFERENCES usuarios(id),
    curso_id BIGINT FOREIGN KEY REFERENCES cursos(id),
    nota INT CHECK (nota BETWEEN 1 AND 5),
    comentario NTEXT,
    data_avaliacao DATETIME2 DEFAULT GETDATE(),
    UNIQUE(usuario_id, curso_id)
);

-- Configurações do sistema
CREATE TABLE configuracoes (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    chave NVARCHAR(100) NOT NULL UNIQUE,
    valor NTEXT,
    descricao NVARCHAR(200),
    tipo NVARCHAR(20) DEFAULT 'STRING',
    atualizado_em DATETIME2 DEFAULT GETDATE()
);

-- Índices para performance
CREATE INDEX IX_usuarios_email ON usuarios(email);
CREATE INDEX IX_usuarios_tipo ON usuarios(tipo);
CREATE INDEX IX_cursos_categoria ON cursos(categoria_id);
CREATE INDEX IX_cursos_professor ON cursos(professor_id);
CREATE INDEX IX_cursos_ativo ON cursos(ativo);
CREATE INDEX IX_matriculas_usuario ON matriculas(usuario_id);
CREATE INDEX IX_matriculas_curso ON matriculas(curso_id);
CREATE INDEX IX_aulas_curso ON aulas(curso_id);
CREATE INDEX IX_contatos_criado_em ON contatos(criado_em);

PRINT 'Tabelas criadas com sucesso!';