const { initDatabase, query } = require('./config/database-sqlite');

async function testDatabase() {
    console.log('🧪 Testando banco SQLite...\n');
    
    try {
        // Inicializar banco
        await initDatabase();
        console.log('✅ Conexão SQLite OK');
        
        // Testar dados
        const users = await query('SELECT COUNT(*) as count FROM users');
        console.log(`👥 Usuários no banco: ${users[0].count}`);
        
        const courses = await query('SELECT COUNT(*) as count FROM courses');
        console.log(`📚 Cursos no banco: ${courses[0].count}`);
        
        // Testar busca de cursos
        const courseList = await query(`
            SELECT c.title, u.name as teacher_name 
            FROM courses c 
            LEFT JOIN users u ON c.teacher_id = u.id 
            LIMIT 3
        `);
        
        console.log('\n📖 Cursos disponíveis:');
        courseList.forEach((course, i) => {
            console.log(`   ${i+1}. ${course.title} - Prof. ${course.teacher_name}`);
        });
        
        // Testar login
        const loginTest = await query('SELECT * FROM users WHERE email = ?', ['joao@email.com']);
        if (loginTest.length > 0) {
            console.log(`\n🔐 Usuário de teste encontrado: ${loginTest[0].name}`);
        }
        
        console.log('\n🎉 Banco SQLite funcionando perfeitamente!');
        console.log('💡 Agora você pode usar a API normalmente');
        
    } catch (error) {
        console.error('❌ Erro no teste:', error.message);
    }
}

testDatabase();