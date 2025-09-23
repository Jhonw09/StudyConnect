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
    imagem_url NVARCHAR(255),
    ativo BIT DEFAULT 1,
    data_criacao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (professor_id) REFERENCES professores(id)
);

-- Tabela de Usuários
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    senha NVARCHAR(255) NOT NULL,
    foto_url NVARCHAR(255) DEFAULT 'images/default-avatar.png',
    bio NVARCHAR(500),
    telefone NVARCHAR(20),
    data_nascimento DATE,
    genero NVARCHAR(20),
    cidade NVARCHAR(100),
    estado NVARCHAR(50),
    data_cadastro DATETIME DEFAULT GETDATE(),
    ultimo_acesso DATETIME,
    ativo BIT DEFAULT 1
);

-- Tabela de Matrículas
CREATE TABLE matriculas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    curso_id INT NOT NULL,
    data_matricula DATETIME DEFAULT GETDATE(),
    progresso DECIMAL(5,2) DEFAULT 0.00,
    concluido BIT DEFAULT 0,
    data_conclusao DATETIME,
    avaliacao DECIMAL(3,2),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

-- Tabela de Aulas
CREATE TABLE aulas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    curso_id INT NOT NULL,
    titulo NVARCHAR(150) NOT NULL,
    descricao NVARCHAR(500),
    video_url NVARCHAR(255),
    duracao_minutos INT DEFAULT 0,
    ordem INT NOT NULL,
    ativo BIT DEFAULT 1,
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

-- Tabela de Progresso das Aulas
CREATE TABLE progresso_aulas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    aula_id INT NOT NULL,
    assistido BIT DEFAULT 0,
    tempo_assistido INT DEFAULT 0,
    data_inicio DATETIME,
    data_conclusao DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (aula_id) REFERENCES aulas(id)
);

-- Tabela de Avaliações de Cursos
CREATE TABLE avaliacoes_cursos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    curso_id INT NOT NULL,
    nota DECIMAL(3,2) NOT NULL,
    comentario NVARCHAR(1000),
    data_avaliacao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

-- Tabela de Favoritos
CREATE TABLE favoritos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    curso_id INT NOT NULL,
    data_favorito DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

-- Tabela de Certificados
CREATE TABLE certificados (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    curso_id INT NOT NULL,
    codigo_certificado NVARCHAR(50) UNIQUE NOT NULL,
    data_emissao DATETIME DEFAULT GETDATE(),
    valido BIT DEFAULT 1,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

-- Tabela de Notificações
CREATE TABLE notificacoes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo NVARCHAR(150) NOT NULL,
    mensagem NVARCHAR(500) NOT NULL,
    tipo NVARCHAR(50) DEFAULT 'info',
    lida BIT DEFAULT 0,
    data_criacao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
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
('Maria Silva', 'maria.silva@studyconnect.com', 'Desenvolvedora Frontend', 'Especialista em HTML, CSS, JavaScript e desenvolvimento web responsivo', 'images/profa.jpg', 5, 4.9),
('Carlos Souza', 'carlos.souza@studyconnect.com', 'Desenvolvedor Backend', 'Expert em Node.js, APIs e arquitetura de sistemas', 'images/Carlos.jpg', 7, 4.8),
('Ana Costa', 'ana.costa@studyconnect.com', 'Professora de Matemática', 'Licenciada em Matemática com foco em ensino fundamental e médio', 'images/profmat.jpg', 10, 4.9),
('João Santos', 'joao.santos@studyconnect.com', 'Professor de Português', 'Licenciado em Letras, especialista em gramática e redação', 'images/profmat.jpg', 8, 4.7);

-- Cursos
INSERT INTO cursos (titulo, descricao, categoria_id, professor_id, duracao, nivel, imagem_url) VALUES
('Frontend Moderno', 'Aprenda HTML, CSS e JavaScript para criar sites incríveis', 1, 1, 25, 'Iniciante', 'images/capa-front-end.jpg'),
('Backend com Node.js', 'Desenvolvimento de servidores e APIs com Node.js', 2, 2, 30, 'Intermediário', 'images/17f7d622-3a54-480e-be53-5dd7296bddce_desenvolvedor+backend.avif'),
('Matemática Fundamental', 'Conceitos essenciais de matemática para o dia a dia', 3, 3, 20, 'Iniciante', 'images/capa-matematicawebp.webp'),
('Português Essencial', 'Gramática, ortografia e redação', 4, 4, 18, 'Iniciante', 'images/dia-mundial-da-lingua-portuguesa-momento-para-se-aperfeicoar-no-idioma.jpeg');

-- Dados de exemplo para usuários
INSERT INTO usuarios (nome, email, senha, foto_url, bio, cidade, estado) VALUES
('Admin Sistema', 'admin@studyconnect.com', 'admin123', 'images/default-avatar.png', 'Administrador do sistema StudyConnect', 'São Paulo', 'SP'),
('João Silva', 'joao@email.com', '123456', 'images/default-avatar.png', 'Estudante apaixonado por aprender', 'Rio de Janeiro', 'RJ'),
('Maria Santos', 'maria@email.com', 'senha123', 'images/default-avatar.png', 'Sempre em busca de conhecimento', 'Belo Horizonte', 'MG');

-- Dados de exemplo para aulas
INSERT INTO aulas (curso_id, titulo, descricao, duracao_minutos, ordem) VALUES
(1, 'Introdução ao HTML', 'Conceitos básicos e estrutura HTML', 30, 1),
(1, 'HTML Semântico', 'Tags semânticas e acessibilidade', 35, 2),
(1, 'Formulários HTML', 'Criando formulários interativos', 40, 3),
(1, 'CSS Flexbox', 'Layout flexível com Flexbox', 45, 4),
(2, 'Introdução ao Node.js', 'Conceitos básicos do Node.js', 35, 1),
(2, 'NPM e Dependências', 'Gerenciamento de pacotes', 30, 2),
(3, 'Números e Operações', 'Operações matemáticas básicas', 25, 1),
(3, 'Frações', 'Trabalhando com frações', 30, 2),
(4, 'Classes de Palavras', 'Substantivos, adjetivos e verbos', 25, 1),
(4, 'Sintaxe', 'Estrutura das frases em português', 30, 2);

-- Dados de exemplo para matrículas
INSERT INTO matriculas (usuario_id, curso_id, progresso, concluido) VALUES
(2, 1, 75.50, 0),
(2, 2, 100.00, 1),
(3, 3, 25.00, 0),
(3, 4, 90.00, 0);

-- Dados de exemplo para favoritos
INSERT INTO favoritos (usuario_id, curso_id) VALUES
(2, 1),
(2, 3),
(3, 2),
(3, 4);

-- Dados de exemplo para avaliações
INSERT INTO avaliacoes_cursos (usuario_id, curso_id, nota, comentario) VALUES
(2, 2, 4.8, 'Excelente curso! Aprendi muito sobre Node.js.'),
(3, 4, 4.5, 'Muito bom para revisar conceitos de português.');

-- Dados de exemplo para certificados
INSERT INTO certificados (usuario_id, curso_id, codigo_certificado) VALUES
(2, 2, 'CERT-NODE-2024-001');

-- Dados de exemplo para notificações
INSERT INTO notificacoes (usuario_id, titulo, mensagem, tipo) VALUES
(2, 'Curso Concluído!', 'Parabéns! Você concluiu o curso de Backend com Node.js.', 'sucesso'),
(3, 'Nova Aula Disponível', 'Uma nova aula foi adicionada ao seu curso de Matemática Fundamental.', 'info');

-- Dados de exemplo para contatos
INSERT INTO contatos (nome, email, assunto, mensagem) VALUES
('Pedro Oliveira', 'pedro@email.com', 'Dúvida sobre curso', 'Gostaria de saber mais sobre o curso de Frontend'),
('Ana Ferreira', 'ana@email.com', 'Sugestão', 'Poderiam adicionar mais conteúdo de matemática?'),
('Lucas Lima', 'lucas@email.com', 'Problema técnico', 'Não consigo acessar minha conta');

GO 'Não consigo acessar minha conta');

GO