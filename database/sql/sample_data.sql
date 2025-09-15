-- Dados de exemplo para o StudyConnect+
USE studyconnect;

-- Inserir categorias
INSERT INTO categories (name, description, icon, color) VALUES
('Frontend', 'Desenvolvimento de interfaces web', 'fas fa-code', '#667eea'),
('Backend', 'Desenvolvimento de servidores e APIs', 'fas fa-server', '#764ba2'),
('Mobile', 'Desenvolvimento de aplicativos móveis', 'fas fa-mobile-alt', '#4facfe'),
('Data Science', 'Ciência de dados e análise', 'fas fa-chart-bar', '#43e97b'),
('DevOps', 'Operações e infraestrutura', 'fas fa-cogs', '#f093fb'),
('Design', 'Design gráfico e UX/UI', 'fas fa-paint-brush', '#f5576c'),
('Matemática', 'Matemática e cálculos', 'fas fa-calculator', '#4facfe'),
('Português', 'Língua portuguesa', 'fas fa-book', '#43e97b');

-- Inserir usuários (professores e alunos)
INSERT INTO users (name, email, password, type, avatar, phone) VALUES
('Maria Silva', 'maria@studyconnect.com', '$2b$10$hash1', 'teacher', 'images/profa.jpg', '(11) 99999-0001'),
('Carlos Souza', 'carlos@studyconnect.com', '$2b$10$hash2', 'teacher', 'images/Carlos.jpg', '(11) 99999-0002'),
('Ana Costa', 'ana@studyconnect.com', '$2b$10$hash3', 'teacher', 'images/profmat.jpg', '(11) 99999-0003'),
('João Santos', 'joao@email.com', '$2b$10$hash4', 'student', NULL, '(11) 99999-1001'),
('Pedro Lima', 'pedro@email.com', '$2b$10$hash5', 'student', NULL, '(11) 99999-1002'),
('Admin User', 'admin@studyconnect.com', '$2b$10$hash6', 'admin', NULL, '(11) 99999-0000');

-- Inserir cursos
INSERT INTO courses (title, description, price, level, duration, image, teacher_id, category_id, rating, students_count, status) VALUES
('HTML5 e CSS3 Moderno', 'Aprenda a criar sites modernos com HTML5 e CSS3', 199.90, 'beginner', 1200, 'images/capa-front-end.jpg', 1, 1, 4.8, 1250, 'published'),
('JavaScript Avançado', 'Domine JavaScript ES6+ e frameworks modernos', 299.90, 'intermediate', 1800, 'images/Foto-programação Web.webp', 1, 1, 4.9, 890, 'published'),
('Node.js e APIs REST', 'Desenvolvimento backend com Node.js', 349.90, 'intermediate', 2100, 'images/17f7d622-3a54-480e-be53-5dd7296bddce_desenvolvedor+backend.avif', 2, 2, 4.7, 650, 'published'),
('React Native', 'Desenvolvimento de apps móveis', 399.90, 'advanced', 2400, 'images/sitep2.jpg', 2, 3, 4.6, 420, 'published'),
('Matemática Básica', 'Fundamentos da matemática', 149.90, 'beginner', 900, 'images/capa-matematicawebp.webp', 3, 7, 4.5, 980, 'published'),
('Português Avançado', 'Gramática e redação avançada', 179.90, 'intermediate', 1100, 'images/dia-mundial-da-lingua-portuguesa-momento-para-se-aperfeicoar-no-idioma.jpeg', 3, 8, 4.4, 750, 'published');

-- Inserir aulas para o curso de HTML5 e CSS3
INSERT INTO lessons (course_id, title, content, video_url, duration, order_num, free) VALUES
(1, 'Introdução ao HTML5', 'Conceitos básicos do HTML5 e estrutura semântica', 'https://example.com/video1', 45, 1, TRUE),
(1, 'Formulários HTML', 'Criando formulários interativos', 'https://example.com/video2', 60, 2, TRUE),
(1, 'Semântica HTML', 'Tags semânticas e acessibilidade', 'https://example.com/video3', 50, 3, FALSE),
(1, 'CSS Flexbox', 'Layout moderno com Flexbox', 'https://example.com/video4', 70, 4, FALSE),
(1, 'CSS Grid', 'Sistema de grid avançado', 'https://example.com/video5', 80, 5, FALSE);

-- Inserir aulas para JavaScript Avançado
INSERT INTO lessons (course_id, title, content, video_url, duration, order_num, free) VALUES
(2, 'ES6+ Features', 'Novas funcionalidades do JavaScript', 'https://example.com/video6', 90, 1, TRUE),
(2, 'Async/Await', 'Programação assíncrona moderna', 'https://example.com/video7', 75, 2, FALSE),
(2, 'Modules e Bundlers', 'Organização de código modular', 'https://example.com/video8', 85, 3, FALSE);

-- Inserir matrículas
INSERT INTO enrollments (student_id, course_id, progress, completed) VALUES
(4, 1, 80.00, FALSE),
(4, 2, 100.00, TRUE),
(5, 1, 45.00, FALSE),
(5, 3, 25.00, FALSE);

-- Inserir progresso das aulas
INSERT INTO lesson_progress (student_id, lesson_id, completed, watched_time) VALUES
(4, 1, TRUE, 2700),
(4, 2, TRUE, 3600),
(4, 3, TRUE, 3000),
(4, 4, FALSE, 1800),
(5, 1, TRUE, 2700),
(5, 2, FALSE, 1200);

-- Inserir avaliações
INSERT INTO reviews (student_id, course_id, rating, comment) VALUES
(4, 2, 5, 'Excelente curso! Aprendi muito sobre JavaScript moderno.'),
(5, 1, 4, 'Muito bom para iniciantes, explicações claras.');

-- Inserir certificados
INSERT INTO certificates (student_id, course_id, certificate_code) VALUES
(4, 2, 'SC-JS-2024-001');

-- Inserir pagamentos
INSERT INTO payments (student_id, course_id, amount, status, payment_method, transaction_id) VALUES
(4, 1, 199.90, 'completed', 'credit_card', 'TXN-001'),
(4, 2, 299.90, 'completed', 'pix', 'TXN-002'),
(5, 1, 199.90, 'completed', 'credit_card', 'TXN-003'),
(5, 3, 349.90, 'pending', 'boleto', 'TXN-004');