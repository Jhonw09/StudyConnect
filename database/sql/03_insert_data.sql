-- =============================================
-- StudyConnect+ - Inserir Dados
-- Execute após 02_create_tables.sql
-- =============================================

USE StudyConnect;
GO

-- Categorias
INSERT INTO categorias (nome, descricao, icone, cor) VALUES
('Frontend', 'Desenvolvimento de interfaces web', 'fas fa-code', '#4facfe'),
('Backend', 'Desenvolvimento de servidores e APIs', 'fas fa-server', '#43e97b'),
('Mobile', 'Desenvolvimento de aplicativos móveis', 'fas fa-mobile-alt', '#f093fb'),
('Data Science', 'Ciência de dados e análise', 'fas fa-chart-bar', '#4facfe'),
('DevOps', 'Operações e infraestrutura', 'fas fa-cogs', '#43e97b'),
('Design', 'Design e UX/UI', 'fas fa-paint-brush', '#f093fb'),
('Matemática', 'Matemática e lógica', 'fas fa-calculator', '#667eea'),
('Português', 'Língua portuguesa', 'fas fa-book', '#764ba2');

-- Tecnologias
INSERT INTO tecnologias (nome, icone, cor) VALUES
('HTML5', 'fab fa-html5', '#e34f26'),
('CSS3', 'fab fa-css3-alt', '#1572b6'),
('JavaScript', 'fab fa-js-square', '#f7df1e'),
('React', 'fab fa-react', '#61dafb'),
('Vue.js', 'fab fa-vuejs', '#4fc08d'),
('Node.js', 'fab fa-node-js', '#339933'),
('Python', 'fab fa-python', '#3776ab'),
('Java', 'fab fa-java', '#007396'),
('Spring Boot', 'fas fa-leaf', '#6db33f'),
('MySQL', 'fas fa-database', '#4479a1'),
('MongoDB', 'fas fa-database', '#47a248'),
('Docker', 'fab fa-docker', '#2496ed'),
('AWS', 'fab fa-aws', '#ff9900'),
('Git', 'fab fa-git-alt', '#f05032');

-- Usuários
INSERT INTO usuarios (nome, email, senha, tipo, avatar, telefone) VALUES
('Admin Sistema', 'admin@studyconnect.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye', 'ADMIN', '/images/admin.jpg', '(11) 99999-9999'),
('Maria Silva', 'maria@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye', 'PROFESSOR', '/images/profa.jpg', '(11) 98888-8888'),
('Carlos Souza', 'carlos@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye', 'PROFESSOR', '/images/Carlos.jpg', '(11) 97777-7777'),
('Ana Lima', 'ana@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye', 'PROFESSOR', '/images/geha_blog-janeiro-2024-09-1.jpg', '(11) 96666-6666'),
('João Pereira', 'joao@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye', 'PROFESSOR', '/images/profmat.jpg', '(11) 95555-5555'),
('Aluno Teste', 'aluno@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye', 'ALUNO', '/images/avatar1.jpg', '(11) 94444-4444');

-- Professores
INSERT INTO professores (usuario_id, especialidade, biografia, avaliacao, total_alunos, total_cursos, online, linkedin, github, website) VALUES
(2, 'Frontend & UX/UI', 'Especialista em React, Vue.js e design de interfaces modernas. +8 anos de experiência no mercado.', 4.9, 450, 3, 1, 'https://linkedin.com/in/maria-silva', 'https://github.com/maria-silva', 'https://mariasilva.dev'),
(3, 'Backend & DevOps', 'Expert em Node.js, Python e arquitetura de microsserviços. +10 anos desenvolvendo sistemas escaláveis.', 4.8, 320, 2, 1, 'https://linkedin.com/in/carlos-souza', 'https://github.com/carlos-souza', 'https://carlossouza.dev'),
(4, 'Português & Literatura', 'Mestre em Letras pela USP, especialista em gramática, redação e literatura brasileira. +8 anos ensinando.', 4.9, 580, 4, 0, 'https://linkedin.com/in/ana-lima', NULL, NULL),
(5, 'Matemática Aplicada', 'PhD em Matemática pela UNICAMP, especialista em álgebra, cálculo e estatística. +10 anos de experiência.', 4.7, 290, 2, 1, 'https://linkedin.com/in/joao-pereira', 'https://github.com/joao-pereira', NULL);

-- Cursos
INSERT INTO cursos (titulo, descricao, professor_id, categoria_id, preco, nivel, duracao_horas, total_aulas, avaliacao, total_avaliacoes, total_alunos, popular, destaque, imagem) VALUES
('Frontend Moderno com React', 'Domine HTML5, CSS3, JavaScript ES6+ e frameworks como React. Crie interfaces modernas e responsivas com as melhores práticas do mercado.', 1, 1, 199.90, 'INICIANTE', 40, 25, 4.9, 156, 450, 1, 1, '/images/capa-front-end.jpg'),
('Backend Avançado com Node.js', 'Desenvolva APIs robustas com Node.js, trabalhe com bancos de dados e implemente arquiteturas escaláveis e seguras.', 2, 2, 249.90, 'AVANCADO', 60, 30, 4.8, 98, 320, 1, 0, '/images/17f7d622-3a54-480e-be53-5dd7296bddce_desenvolvedor+backend.avif'),
('Português Completo', 'Domine a língua portuguesa com gramática, redação e interpretação de texto. Prepare-se para concursos e vestibulares.', 3, 8, 149.90, 'INICIANTE', 40, 20, 4.9, 187, 580, 0, 1, '/images/dia-mundial-da-lingua-portuguesa-momento-para-se-aperfeicoar-no-idioma.jpeg'),
('Matemática Aplicada', 'Domine álgebra, geometria, cálculo e estatística. Aprenda matemática de forma prática e aplicada à programação.', 4, 7, 179.90, 'INTERMEDIARIO', 45, 22, 4.7, 95, 290, 0, 0, '/images/capa-matematicawebp.webp');

-- Aulas (Frontend)
INSERT INTO aulas (curso_id, titulo, descricao, video_url, duracao_minutos, ordem, gratuita) VALUES
(1, 'Introdução ao HTML5', 'Conceitos básicos e estrutura semântica do HTML5', 'https://youtube.com/watch?v=html5', 45, 1, 1),
(1, 'CSS3 Avançado', 'Flexbox, Grid Layout e animações CSS', 'https://youtube.com/watch?v=css3', 60, 2, 0),
(1, 'JavaScript ES6+', 'Sintaxe moderna do JavaScript e suas funcionalidades', 'https://youtube.com/watch?v=js', 75, 3, 0),
(1, 'React Fundamentos', 'Componentes, props e estado no React', 'https://youtube.com/watch?v=react', 90, 4, 0),
(1, 'Projeto Final', 'Desenvolvendo uma aplicação completa', 'https://youtube.com/watch?v=projeto', 120, 5, 0);

-- Aulas (Backend)
INSERT INTO aulas (curso_id, titulo, descricao, video_url, duracao_minutos, ordem, gratuita) VALUES
(2, 'Configurando Node.js', 'Instalação e configuração do ambiente de desenvolvimento', 'https://youtube.com/watch?v=nodejs', 30, 1, 1),
(2, 'Express.js Básico', 'Criando servidor web com Express', 'https://youtube.com/watch?v=express', 45, 2, 0),
(2, 'APIs REST', 'Desenvolvimento de endpoints RESTful', 'https://youtube.com/watch?v=rest', 90, 3, 0),
(2, 'Banco de Dados', 'Integração com MongoDB e MySQL', 'https://youtube.com/watch?v=database', 75, 4, 0);

-- Relacionar cursos com tecnologias
INSERT INTO curso_tecnologias (curso_id, tecnologia_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), -- Frontend: HTML, CSS, JS, React
(2, 3), (2, 6), (2, 10), (2, 11), -- Backend: JS, Node.js, MySQL, MongoDB
(3, 1), -- Português: HTML (para web)
(4, 7); -- Matemática: Python

-- Jogos
INSERT INTO jogos (nome, tipo, descricao, icone, url, nivel, tempo_limite) VALUES
('Digitação Rápida', 'DIGITACAO', 'Melhore sua velocidade de digitação em 5 fases progressivas. Complete todas as fases e torne-se um expert!', 'fas fa-keyboard', 'typing-game.html', 'FACIL', 300),
('Quiz Misto', 'QUIZ', 'Avalie seus conhecimentos em programação e cultura geral com questões diversificadas e desafiadoras.', 'fas fa-brain', 'quiz-misto.html', 'MEDIO', 600),
('Quiz de Português', 'QUIZ', 'Teste seus conhecimentos em gramática, literatura e interpretação de texto com questões do ensino médio.', 'fas fa-book-open', 'quiz-portugues.html', 'FACIL', 480);

-- Matrículas de exemplo
INSERT INTO matriculas (usuario_id, curso_id, progresso, concluido) VALUES
(6, 1, 75.5, 0), -- Aluno no curso Frontend
(6, 3, 100.0, 1); -- Aluno concluiu Português

-- Progresso das aulas
INSERT INTO progresso_aulas (matricula_id, aula_id, assistido, tempo_assistido, data_conclusao) VALUES
(1, 1, 1, 45, GETDATE()-5), -- Assistiu aula 1
(1, 2, 1, 60, GETDATE()-3), -- Assistiu aula 2
(1, 3, 1, 45, GETDATE()-1), -- Assistiu parcialmente aula 3
(2, 6, 1, 30, GETDATE()-10); -- Assistiu aula do curso de Português

-- Avaliações
INSERT INTO avaliacoes_cursos (usuario_id, curso_id, nota, comentario) VALUES
(6, 3, 5, 'Excelente curso! A professora explica muito bem e o conteúdo é completo.');

-- Resultados de jogos
INSERT INTO resultados_jogos (usuario_id, jogo_id, pontuacao, tempo_segundos, acertos, erros) VALUES
(6, 1, 850, 180, 85, 15), -- Digitação
(6, 2, 750, 420, 8, 2),   -- Quiz Misto
(6, 3, 900, 360, 9, 1);   -- Quiz Português

-- Contatos de exemplo
INSERT INTO contatos (nome, email, telefone, assunto, mensagem, tipo) VALUES
('João Silva', 'joao.silva@email.com', '(11) 98765-4321', 'Dúvida sobre curso', 'Gostaria de saber mais informações sobre o curso de Frontend.', 'CURSO'),
('Maria Santos', 'maria.santos@email.com', '(11) 87654-3210', 'Suporte técnico', 'Estou com dificuldades para acessar as aulas do curso.', 'SUPORTE'),
('Pedro Costa', 'pedro.costa@email.com', '(11) 76543-2109', 'Parceria', 'Tenho interesse em ser professor na plataforma.', 'PARCERIA');

-- Configurações do sistema
INSERT INTO configuracoes (chave, valor, descricao, tipo) VALUES
('site_name', 'StudyConnect+', 'Nome da plataforma', 'STRING'),
('site_email', 'contato@studyconnect.com', 'Email de contato principal', 'STRING'),
('site_telefone', '(11) 99999-9999', 'Telefone de contato', 'STRING'),
('max_upload_size', '10485760', 'Tamanho máximo de upload em bytes (10MB)', 'NUMBER'),
('enable_notifications', 'true', 'Habilitar sistema de notificações', 'BOOLEAN'),
('maintenance_mode', 'false', 'Modo de manutenção ativo', 'BOOLEAN'),
('max_students_per_course', '1000', 'Máximo de alunos por curso', 'NUMBER'),
('course_approval_required', 'true', 'Cursos precisam de aprovação', 'BOOLEAN');

