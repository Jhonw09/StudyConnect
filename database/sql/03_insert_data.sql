-- Dados iniciais para o StudyConnect
USE StudyConnect;
GO

-- Inserir categorias
INSERT INTO categorias (nome, descricao, cor) VALUES
('Frontend', 'Desenvolvimento de interfaces', '#667eea'),
('Backend', 'Desenvolvimento servidor', '#764ba2'),
('Mobile', 'Aplicativos móveis', '#4facfe'),
('Data Science', 'Ciência de dados', '#43e97b'),
('DevOps', 'Operações e desenvolvimento', '#f093fb');

-- Inserir tecnologias
INSERT INTO tecnologias (nome, icone) VALUES
('HTML', 'fab fa-html5'),
('CSS', 'fab fa-css3-alt'),
('JavaScript', 'fab fa-js-square'),
('React', 'fab fa-react'),
('Node.js', 'fab fa-node-js'),
('Python', 'fab fa-python'),
('Java', 'fab fa-java'),
('PHP', 'fab fa-php'),
('Angular', 'fab fa-angular'),
('Vue.js', 'fab fa-vuejs');

-- Inserir usuário admin
INSERT INTO usuarios (nome, email, senha, tipo) VALUES
('Admin', 'admin@studyconnect.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye', 'admin');

-- Inserir professores exemplo
INSERT INTO usuarios (nome, email, senha, tipo) VALUES
('João Silva', 'joao@studyconnect.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye', 'professor'),
('Maria Santos', 'maria@studyconnect.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye', 'professor'),
('Pedro Costa', 'pedro@studyconnect.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye', 'professor');

INSERT INTO professores (usuario_id, especialidade, biografia, avaliacao, total_alunos, status_online) VALUES
(2, 'Frontend Developer', 'Especialista em React e JavaScript', 4.8, 1250, 1),
(3, 'Backend Developer', 'Expert em Node.js e Python', 4.9, 980, 0),
(4, 'Full Stack Developer', 'Desenvolvedor completo', 4.7, 1500, 1);

-- Inserir cursos exemplo
INSERT INTO cursos (titulo, descricao, professor_id, categoria_id, preco, nivel, duracao_horas, avaliacao, total_alunos, popular) VALUES
('React Completo', 'Aprenda React do zero ao avançado', 1, 1, 199.90, 'intermediario', 40, 4.8, 1250, 1),
('Node.js API', 'Construa APIs robustas com Node.js', 2, 2, 149.90, 'avancado', 30, 4.9, 980, 1),
('JavaScript Moderno', 'ES6+ e funcionalidades avançadas', 3, 1, 99.90, 'iniciante', 25, 4.7, 1500, 0);