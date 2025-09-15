const express = require('express');
const cors = require('cors');
const db = require('./config');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('../'));

// Conectar ao banco
db.connect().then(() => {
    console.log('✅ Banco conectado com sucesso!');
}).catch(err => {
    console.error('❌ Erro ao conectar:', err.message);
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const result = await db.execute('sp_AutenticarUsuario', { email, senha });
        
        if (result.length > 0) {
            res.json({ success: true, user: result[0] });
        } else {
            res.json({ success: false, message: 'Credenciais inválidas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter cursos
app.get('/api/cursos', async (req, res) => {
    try {
        const { categoria } = req.query;
        const result = await db.execute('sp_ObterCursosPorCategoria', { 
            categoria_id: categoria || null 
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter categorias
app.get('/api/categorias', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM categorias');
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Matricular aluno
app.post('/api/matricular', async (req, res) => {
    try {
        const { aluno_id, curso_id } = req.body;
        const result = await db.execute('sp_MatricularAluno', { aluno_id, curso_id });
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter professores
app.get('/api/professores', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT p.*, u.nome, u.email 
            FROM professores p 
            INNER JOIN usuarios u ON p.usuario_id = u.id
        `);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Atualizar progresso
app.post('/api/progresso', async (req, res) => {
    try {
        const { matricula_id, aula_id } = req.body;
        await db.execute('sp_AtualizarProgresso', { matricula_id, aula_id });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});