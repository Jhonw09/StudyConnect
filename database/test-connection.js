const { testConnection, query } = require('./config/database');
const User = require('./models/User');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');

async function runTests() {
    console.log('🧪 Iniciando testes do sistema...\n');
    
    try {
        // Teste 1: Conexão com banco
        console.log('1️⃣ Testando conexão com banco...');
        const connected = await testConnection();
        if (!connected) throw new Error('Falha na conexão');
        console.log('✅ Conexão OK\n');
        
        // Teste 2: Buscar usuários
        console.log('2️⃣ Testando busca de usuários...');
        const users = await User.findAll();
        console.log(`✅ ${users.length} usuários encontrados\n`);
        
        // Teste 3: Buscar cursos
        console.log('3️⃣ Testando busca de cursos...');
        const courses = await Course.findAll();
        console.log(`✅ ${courses.length} cursos encontrados\n`);
        
        // Teste 4: Buscar cursos populares
        console.log('4️⃣ Testando cursos populares...');
        const popularCourses = await Course.findPopular(3);
        console.log(`✅ ${popularCourses.length} cursos populares encontrados\n`);
        
        // Teste 5: Verificar matrículas
        console.log('5️⃣ Testando sistema de matrículas...');
        const enrollments = await Enrollment.findByStudent(4);
        console.log(`✅ ${enrollments.length} matrículas encontradas\n`);
        
        // Teste 6: Estatísticas gerais
        console.log('6️⃣ Testando estatísticas...');
        const stats = await Enrollment.getStats();
        console.log(`✅ Estatísticas: ${stats.total_enrollments} matrículas, ${stats.completed_enrollments} concluídas\n`);
        
        // Teste 7: Query personalizada
        console.log('7️⃣ Testando query personalizada...');
        const customQuery = `
            SELECT c.title, u.name as teacher, COUNT(e.id) as students
            FROM courses c
            LEFT JOIN users u ON c.teacher_id = u.id
            LEFT JOIN enrollments e ON c.id = e.course_id
            WHERE c.status = 'published'
            GROUP BY c.id
            ORDER BY students DESC
            LIMIT 3
        `;
        const topCourses = await query(customQuery);
        console.log('✅ Top 3 cursos por número de alunos:');
        topCourses.forEach((course, index) => {
            console.log(`   ${index + 1}. ${course.title} - ${course.teacher} (${course.students} alunos)`);
        });
        
        console.log('\n🎉 Todos os testes passaram com sucesso!');
        console.log('💡 O sistema está funcionando corretamente');
        
    } catch (error) {
        console.error('❌ Erro nos testes:', error.message);
        process.exit(1);
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    runTests();
}

module.exports = runTests;