const express = require('express');
const cors = require('cors');
const { initDatabase, query } = require('./config/database-sqlite');

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());

// Inicializar banco
initDatabase();

// Rota de teste
app.get('/test', async (req, res) => {
    try {
        const users = await query('SELECT COUNT(*) as count FROM users');
        const courses = await query('SELECT COUNT(*) as count FROM courses');
        
        res.json({
            status: 'FUNCIONANDO! 🎉',
            database: 'SQLite OK',
            users: users[0].count,
            courses: courses[0].count,
            timestamp: new Date().toLocaleString('pt-BR')
        });
    } catch (error) {
        res.json({
            status: 'Erro',
            error: error.message
        });
    }
});

// Listar cursos
app.get('/cursos', async (req, res) => {
    try {
        const courses = await query(`
            SELECT c.id, c.title, c.description, c.price, c.level, 
                   u.name as professor, c.rating, c.students_count
            FROM courses c
            LEFT JOIN users u ON c.teacher_id = u.id
            WHERE c.status = 'published'
        `);
        
        res.json({
            total: courses.length,
            cursos: courses
        });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Listar professores
app.get('/professores', async (req, res) => {
    try {
        const teachers = await query(`
            SELECT id, name, email, avatar, phone
            FROM users 
            WHERE type = 'teacher' AND active = 1
        `);
        
        res.json({
            total: teachers.length,
            professores: teachers
        });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Login simples
app.post('/login', async (req, res) => {
    try {
        const { email } = req.body;
        const users = await query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length > 0) {
            res.json({
                success: true,
                usuario: {
                    id: users[0].id,
                    name: users[0].name,
                    email: users[0].email,
                    type: users[0].type
                }
            });
        } else {
            res.json({ success: false, message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 API SIMPLES rodando na porta ${PORT}`);
    console.log(`🌐 Teste: http://localhost:${PORT}/test`);
    console.log(`📚 Cursos: http://localhost:${PORT}/cursos`);
    console.log(`👨‍🏫 Professores: http://localhost:${PORT}/professores`);
});

module.exports = app;