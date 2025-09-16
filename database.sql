-- =============================================
-- StudyConnect+ - Banco Completo e Funcional
-- =============================================

-- Criar banco
CREATE DATABASE StudyConnect;
GO
USE StudyConnect;
GO

-- ========== TABELAS PRINCIPAIS ==========

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
    nome NVARCHAR(50) NOT NULL,
    icone NVARCHAR(50),
    cor NVARCHAR(7) DEFAULT '#667eea',
    ativo BIT DEFAULT 1
);

-- Professores
CREATE TABLE professores (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    usuario_id BIGINT FOREIGN KEY REFERENCES usuarios(id),
    especialidade NVARCHAR(100),
    biografia NTEXT,
    avaliacao DECIMAL(3,2) DEFAULT 0,
    total_alunos INT DEFAULT 0,
    total_cursos INT DEFAULT 0,
    online BIT DEFAULT 0,
    linkedin NVARCHAR(200),
    github NVARCHAR(200),
    aprovado BIT DEFAULT 1
);

-- Cursos
CREATE TABLE cursos (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(100) NOT NULL,
    descricao NTEXT,
    professor_id BIGINT FOREIGN KEY REFERENCES professores(id),
    categoria_id BIGINT FOREIGN KEY REFERENCES categorias(id),
    nivel NVARCHAR(20) CHECK (nivel IN ('INICIANTE', 'INTERMEDIARIO', 'AVANCADO')) DEFAULT 'INICIANTE',
    duracao_horas INT DEFAULT 0,
    total_aulas INT DEFAULT 0,
    avaliacao DECIMAL(3,2) DEFAULT 0,
    total_alunos INT DEFAULT 0,
    popular BIT DEFAULT 0,
    imagem NVARCHAR(500),
    ativo BIT DEFAULT 1,
    criado_em DATETIME2 DEFAULT GETDATE()
);

-- Aulas
CREATE TABLE aulas (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    curso_id BIGINT FOREIGN KEY REFERENCES cursos(id),
    titulo NVARCHAR(100) NOT NULL,
    descricao NTEXT,
    video_url NVARCHAR(500),
    duracao_minutos INT DEFAULT 0,
    ordem INT NOT NULL,
    gratuita BIT DEFAULT 0,
    ativo BIT DEFAULT 1
);

-- Matrículas
CREATE TABLE matriculas (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    usuario_id BIGINT FOREIGN KEY REFERENCES usuarios(id),
    curso_id BIGINT FOREIGN KEY REFERENCES cursos(id),
    progresso DECIMAL(5,2) DEFAULT 0,
    concluido BIT DEFAULT 0,
    data_matricula DATETIME2 DEFAULT GETDATE()
);

-- Progresso das aulas
CREATE TABLE progresso_aulas (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    matricula_id BIGINT FOREIGN KEY REFERENCES matriculas(id),
    aula_id BIGINT FOREIGN KEY REFERENCES aulas(id),
    assistido BIT DEFAULT 0,
    data_conclusao DATETIME2
);

-- Contatos
CREATE TABLE contatos (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    assunto NVARCHAR(200) NOT NULL,
    mensagem NTEXT NOT NULL,
    respondido BIT DEFAULT 0,
    criado_em DATETIME2 DEFAULT GETDATE()
);

-- Quiz/Jogos
CREATE TABLE jogos (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    tipo NVARCHAR(50), -- 'QUIZ', 'DIGITACAO'
    descricao NTEXT,
    icone NVARCHAR(50),
    url NVARCHAR(200),
    ativo BIT DEFAULT 1
);

-- Resultados dos jogos
CREATE TABLE resultados_jogos (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    usuario_id BIGINT FOREIGN KEY REFERENCES usuarios(id),
    jogo_id BIGINT FOREIGN KEY REFERENCES jogos(id),
    pontuacao INT DEFAULT 0,
    tempo_segundos INT DEFAULT 0,
    data_jogo DATETIME2 DEFAULT GETDATE()
);

-- Tecnologias
CREATE TABLE tecnologias (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(50) NOT NULL,
    icone NVARCHAR(100),
    cor NVARCHAR(7) DEFAULT '#667eea'
);

-- Curso-Tecnologias (relacionamento)
CREATE TABLE curso_tecnologias (
    curso_id BIGINT FOREIGN KEY REFERENCES cursos(id),
    tecnologia_id BIGINT FOREIGN KEY REFERENCES tecnologias(id),
    PRIMARY KEY (curso_id, tecnologia_id)
);

-- ========== INSERIR DADOS ==========

-- Categorias
INSERT INTO categorias (nome, icone, cor) VALUES
('Frontend', 'fas fa-code', '#4facfe'),
('Backend', 'fas fa-server', '#43e97b'),
('Matemática', 'fas fa-calculator', '#667eea'),
('Português', 'fas fa-book', '#764ba2');

-- Usuários
INSERT INTO usuarios (nome, email, senha, tipo, avatar, telefone) VALUES
('Admin', 'admin@studyconnect.com', '123456', 'ADMIN', '/images/admin.jpg', '(11) 99999-9999'),
('Maria Silva', 'maria@email.com', '123456', 'PROFESSOR', '/images/profa.jpg', '(11) 98888-8888'),
('Carlos Souza', 'carlos@email.com', '123456', 'PROFESSOR', '/images/Carlos.jpg', '(11) 97777-7777'),
('Ana Lima', 'ana@email.com', '123456', 'PROFESSOR', '/images/geha_blog-janeiro-2024-09-1.jpg', '(11) 96666-6666'),
('João Pereira', 'joao@email.com', '123456', 'PROFESSOR', '/images/profmat.jpg', '(11) 95555-5555'),
('Aluno Teste', 'aluno@email.com', '123456', 'ALUNO', '/images/avatar1.jpg', '(11) 94444-4444');

-- Professores
INSERT INTO professores (usuario_id, especialidade, biografia, avaliacao, total_alunos, total_cursos, online, linkedin, github) VALUES
(2, 'Frontend & UX/UI', 'Especialista em React, Vue.js e design de interfaces modernas. +8 anos de experiência.', 4.9, 450, 3, 1, 'https://linkedin.com/in/maria-silva', 'https://github.com/maria-silva'),
(3, 'Backend & DevOps', 'Expert em Node.js, Python e arquitetura de microsserviços. +10 anos de experiência.', 4.8, 320, 2, 1, 'https://linkedin.com/in/carlos-souza', 'https://github.com/carlos-souza'),
(4, 'Português & Literatura', 'Mestre em Letras pela USP, especialista em gramática e redação. +8 anos ensinando.', 4.9, 580, 4, 0, 'https://linkedin.com/in/ana-lima', NULL),
(5, 'Matemática Aplicada', 'PhD em Matemática pela UNICAMP, especialista em álgebra e cálculo. +10 anos de experiência.', 4.7, 290, 2, 1, 'https://linkedin.com/in/joao-pereira', 'https://github.com/joao-pereira');

-- Cursos
INSERT INTO cursos (titulo, descricao, professor_id, categoria_id, nivel, duracao_horas, total_aulas, avaliacao, total_alunos, popular, imagem) VALUES
('Frontend Moderno', 'Domine HTML5, CSS3, JavaScript ES6+ e frameworks como React. Crie interfaces modernas e responsivas.', 1, 1, 'INICIANTE', 40, 25, 4.9, 450, 1, '/images/capa-front-end.jpg'),
('Backend Avançado', 'Desenvolva APIs robustas com Node.js, trabalhe com bancos de dados e implemente arquiteturas escaláveis.', 2, 2, 'AVANCADO', 60, 30, 4.8, 320, 1, '/images/17f7d622-3a54-480e-be53-5dd7296bddce_desenvolvedor+backend.avif'),
('Português', 'Domine a língua portuguesa com gramática, redação e interpretação de texto. Prepare-se para concursos.', 3, 4, 'INICIANTE', 40, 20, 4.9, 580, 0, '/images/dia-mundial-da-lingua-portuguesa-momento-para-se-aperfeicoar-no-idioma.jpeg'),
('Matemática', 'Domine álgebra, geometria, cálculo e estatística. Aprenda matemática de forma prática e aplicada.', 4, 3, 'INTERMEDIARIO', 45, 22, 4.7, 290, 0, '/images/capa-matematicawebp.webp');

-- Aulas (exemplo para Frontend)
INSERT INTO aulas (curso_id, titulo, descricao, duracao_minutos, ordem, gratuita) VALUES
(1, 'Introdução ao HTML5', 'Conceitos básicos e estrutura do HTML5', 45, 1, 1),
(1, 'CSS3 Avançado', 'Flexbox, Grid e animações CSS', 60, 2, 0),
(1, 'JavaScript ES6+', 'Sintaxe moderna do JavaScript', 75, 3, 0),
(1, 'React Fundamentos', 'Componentes e estado no React', 90, 4, 0),
(1, 'Projeto Final', 'Desenvolvendo uma aplicação completa', 120, 5, 0);

-- Tecnologias
INSERT INTO tecnologias (nome, icone, cor) VALUES
('HTML5', 'fab fa-html5', '#e34f26'),
('CSS3', 'fab fa-css3-alt', '#1572b6'),
('JavaScript', 'fab fa-js-square', '#f7df1e'),
('React', 'fab fa-react', '#61dafb'),
('Node.js', 'fab fa-node-js', '#339933'),
('MongoDB', 'fas fa-database', '#47a248');

-- Relacionar cursos com tecnologias
INSERT INTO curso_tecnologias (curso_id, tecnologia_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), -- Frontend
(2, 3), (2, 5), (2, 6); -- Backend

-- Jogos
INSERT INTO jogos (nome, tipo, descricao, icone, url) VALUES
('Digitação Rápida', 'DIGITACAO', 'Melhore sua velocidade de digitação em 5 fases progressivas', 'fas fa-keyboard', 'typing-game.html'),
('Quiz Misto', 'QUIZ', 'Avalie seus conhecimentos em programação e cultura geral', 'fas fa-brain', 'quiz-misto.html'),
('Quiz de Português', 'QUIZ', 'Teste seus conhecimentos em gramática e literatura', 'fas fa-book-open', 'quiz-portugues.html');

-- ========== ÍNDICES PARA PERFORMANCE ==========
CREATE INDEX IX_usuarios_email ON usuarios(email);
CREATE INDEX IX_cursos_categoria ON cursos(categoria_id);
CREATE INDEX IX_cursos_professor ON cursos(professor_id);
CREATE INDEX IX_matriculas_usuario ON matriculas(usuario_id);
CREATE INDEX IX_matriculas_curso ON matriculas(curso_id);

PRINT 'Banco de dados StudyConnect criado com sucesso!';