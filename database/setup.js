const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config({ path: './config/.env' });

async function setupDatabase() {
    console.log('🚀 Iniciando configuração do banco de dados...');
    
    try {
        // Conectar ao MySQL (sem especificar database)
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            port: process.env.DB_PORT || 3306
        });
        
        console.log('✅ Conectado ao MySQL');
        
        // Ler e executar script de criação
        const createScript = await fs.readFile(path.join(__dirname, 'sql', 'create_database.sql'), 'utf8');
        const createStatements = createScript.split(';').filter(stmt => stmt.trim());
        
        for (const statement of createStatements) {
            if (statement.trim()) {
                await connection.execute(statement);
            }
        }
        
        console.log('✅ Banco de dados e tabelas criados');
        
        // Ler e executar dados de exemplo
        const sampleScript = await fs.readFile(path.join(__dirname, 'sql', 'sample_data.sql'), 'utf8');
        const sampleStatements = sampleScript.split(';').filter(stmt => stmt.trim());
        
        for (const statement of sampleStatements) {
            if (statement.trim()) {
                await connection.execute(statement);
            }
        }
        
        console.log('✅ Dados de exemplo inseridos');
        
        // Verificar dados
        const [users] = await connection.execute('SELECT COUNT(*) as count FROM studyconnect.users');
        const [courses] = await connection.execute('SELECT COUNT(*) as count FROM studyconnect.courses');
        const [enrollments] = await connection.execute('SELECT COUNT(*) as count FROM studyconnect.enrollments');
        
        console.log('\n📊 Estatísticas do banco:');
        console.log(`👥 Usuários: ${users[0].count}`);
        console.log(`📚 Cursos: ${courses[0].count}`);
        console.log(`🎓 Matrículas: ${enrollments[0].count}`);
        
        await connection.end();
        console.log('\n🎉 Configuração concluída com sucesso!');
        console.log('💡 Execute "npm start" para iniciar a API');
        
    } catch (error) {
        console.error('❌ Erro na configuração:', error.message);
        process.exit(1);
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    setupDatabase();
}

module.exports = setupDatabase;