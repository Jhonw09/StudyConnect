const fs = require('fs').promises;
const path = require('path');
const { initDatabase, query } = require('./config/database-sqlite');

async function setupDatabase() {
    console.log('🚀 Iniciando configuração do banco SQLite...');
    
    try {
        // Inicializar banco
        await initDatabase();
        console.log('✅ Banco SQLite inicializado');
        
        // Ler e executar script de criação
        const createScript = await fs.readFile(path.join(__dirname, 'sql', 'create_sqlite.sql'), 'utf8');
        const statements = createScript.split(';').filter(stmt => stmt.trim());
        
        for (const statement of statements) {
            if (statement.trim()) {
                await query(statement);
            }
        }
        
        console.log('✅ Tabelas criadas');
        
        // Inserir dados de exemplo
        await insertSampleData();
        console.log('✅ Dados de exemplo inseridos');
        
        // Verificar dados
        const users = await query('SELECT COUNT(*) as count FROM users');
        const courses = await query('SELECT COUNT(*) as count FROM courses');
        const enrollments = await query('SELECT COUNT(*) as count FROM enrollments');
        
        console.log('\n📊 Estatísticas do banco:');
        console.log(`👥 Usuários: ${users[0].count}`);
        console.log(`📚 Cursos: ${courses[0].count}`);
        console.log(`🎓 Matrículas: ${enrollments[0].count}`);
        
        console.log('\n🎉 Configuração concluída com sucesso!');
        console.log('💡 Execute "npm start" para iniciar a API');
        
    } catch (error) {
        console.error('❌ Erro na configuração:', error.message);
        process.exit(1);
    }
}

async function insertSampleData() {
    // Inserir categorias
    await query(`INSERT OR IGNORE INTO categories (name, description, icon, color) VALUES 
        ('Frontend', 'Desenvolvimento de interfaces web', 'fas fa-code', '#667eea'),
        ('Backend', 'Desenvolvimento de servidores e APIs', 'fas fa-server', '#764ba2'),
        ('Mobile', 'Desenvolvimento de aplicativos móveis', 'fas fa-mobile-alt', '#4facfe'),
        ('Matemática', 'Matemática e cálculos', 'fas fa-calculator', '#43e97b')`);
    
    // Inserir usuários
    await query(`INSERT OR IGNORE INTO users (name, email, password, type, avatar, phone) VALUES 
        ('Maria Silva', 'maria@studyconnect.com', '$2b$10$hash1', 'teacher', 'images/profa.jpg', '(11) 99999-0001'),
        ('Carlos Souza', 'carlos@studyconnect.com', '$2b$10$hash2', 'teacher', 'images/Carlos.jpg', '(11) 99999-0002'),
        ('João Santos', 'joao@email.com', '$2b$10$hash4', 'student', NULL, '(11) 99999-1001'),
        ('Admin User', 'admin@studyconnect.com', '$2b$10$hash6', 'admin', NULL, '(11) 99999-0000')`);
    
    // Inserir cursos
    await query(`INSERT OR IGNORE INTO courses (title, description, price, level, duration, image, teacher_id, category_id, rating, students_count, status) VALUES 
        ('HTML5 e CSS3 Moderno', 'Aprenda a criar sites modernos', 199.90, 'beginner', 1200, 'images/capa-front-end.jpg', 1, 1, 4.8, 1250, 'published'),
        ('JavaScript Avançado', 'Domine JavaScript ES6+', 299.90, 'intermediate', 1800, 'images/Foto-programação Web.webp', 1, 1, 4.9, 890, 'published'),
        ('Node.js e APIs REST', 'Desenvolvimento backend', 349.90, 'intermediate', 2100, 'images/backend.jpg', 2, 2, 4.7, 650, 'published')`);
    
    // Inserir aulas
    await query(`INSERT OR IGNORE INTO lessons (course_id, title, content, duration, order_num, free) VALUES 
        (1, 'Introdução ao HTML5', 'Conceitos básicos do HTML5', 45, 1, 1),
        (1, 'Formulários HTML', 'Criando formulários interativos', 60, 2, 1),
        (1, 'CSS Flexbox', 'Layout moderno com Flexbox', 70, 3, 0)`);
    
    // Inserir matrículas
    await query(`INSERT OR IGNORE INTO enrollments (student_id, course_id, progress, completed) VALUES 
        (3, 1, 80.00, 0),
        (3, 2, 100.00, 1)`);
}

if (require.main === module) {
    setupDatabase();
}

module.exports = setupDatabase;