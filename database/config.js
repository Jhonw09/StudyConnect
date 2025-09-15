const sql = require('mssql');

const config = {
    user: 'sa', // ou seu usuário
    password: 'sua_senha', // substitua pela sua senha
    server: 'localhost', // ou seu servidor
    database: 'StudyConnectPlus',
    options: {
        encrypt: false, // true para Azure
        trustServerCertificate: true
    }
};

class Database {
    constructor() {
        this.pool = null;
    }

    async connect() {
        try {
            this.pool = await sql.connect(config);
            console.log('Conectado ao SQL Server');
            return this.pool;
        } catch (err) {
            console.error('Erro ao conectar:', err);
            throw err;
        }
    }

    async query(queryString, params = {}) {
        try {
            const request = this.pool.request();
            
            // Adicionar parâmetros
            Object.keys(params).forEach(key => {
                request.input(key, params[key]);
            });
            
            const result = await request.query(queryString);
            return result.recordset;
        } catch (err) {
            console.error('Erro na query:', err);
            throw err;
        }
    }

    async execute(procedureName, params = {}) {
        try {
            const request = this.pool.request();
            
            // Adicionar parâmetros
            Object.keys(params).forEach(key => {
                request.input(key, params[key]);
            });
            
            const result = await request.execute(procedureName);
            return result.recordset;
        } catch (err) {
            console.error('Erro ao executar procedure:', err);
            throw err;
        }
    }

    async close() {
        if (this.pool) {
            await this.pool.close();
        }
    }
}

module.exports = new Database();