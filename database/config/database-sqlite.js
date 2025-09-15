const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

let db = null;

// Configuração do SQLite
async function initDatabase() {
    if (db) return db;
    
    try {
        db = await open({
            filename: path.join(__dirname, '..', 'studyconnect.db'),
            driver: sqlite3.Database
        });
        
        console.log('✅ Conectado ao SQLite com sucesso!');
        return db;
    } catch (error) {
        console.error('❌ Erro ao conectar ao SQLite:', error.message);
        throw error;
    }
}

// Função para executar queries
async function query(sql, params = []) {
    try {
        if (!db) await initDatabase();
        
        if (sql.trim().toUpperCase().startsWith('SELECT')) {
            return await db.all(sql, params);
        } else {
            return await db.run(sql, params);
        }
    } catch (error) {
        console.error('Erro na query:', error);
        throw error;
    }
}

// Função para testar conexão
async function testConnection() {
    try {
        await initDatabase();
        await db.get('SELECT 1');
        console.log('✅ Conexão SQLite testada com sucesso!');
        return true;
    } catch (error) {
        console.error('❌ Erro ao testar conexão SQLite:', error.message);
        return false;
    }
}

module.exports = {
    initDatabase,
    query,
    testConnection
};