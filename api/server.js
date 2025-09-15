const express = require('express');
const cors = require('cors');
const sql = require('mssql');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do SQL Server
const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

// Conectar ao banco
sql.connect(config).then(() => {
    console.log('Conectado ao SQL Server');
}).catch(err => {
    console.error('Erro ao conectar:', err);
});

// Rotas
app.get('/api/cursos', async (req, res) => {
    try {
        const result = await sql.query`
            SELECT c.*, cat.nome as categoria_nome, u.nome as professor_nome
            FROM cursos c
            INNER JOIN categorias cat ON c.categoria_id = cat.id
            INNER JOIN professores p ON c.professor_id = p.id
            INNER JOIN usuarios u ON p.usuario_id = u.id
            WHERE c.ativo = 1
            ORDER BY c.popular DESC, c.avaliacao DESC
        `;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/categorias', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM categorias`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const result = await sql.query`
            SELECT u.id, u.nome, u.email, u.tipo
            FROM usuarios u
            WHERE u.email = ${email} AND u.senha = ${senha} AND u.ativo = 1
        `;
        
        if (result.recordset.length > 0) {
            res.json({ success: true, user: result.recordset[0] });
        } else {
            res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});