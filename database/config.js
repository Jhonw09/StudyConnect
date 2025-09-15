const sql = require('mssql');

const config = {
    user: 'sa',
    password: '123456', // senha padrão
    server: 'localhost\\SQLEXPRESS',
    database: 'StudyConnectPlus',
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
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