const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { initDatabase, query } = require('../config/database-sqlite');

const app = express();
const PORT = 3002;
const JWT_SECRET = 'studyconnect_secret_key_2024';

// Middlewares
app.use(cors());
app.use(express.json());

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token de acesso requerido' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
};

// Inicializar banco
initDatabase();

// Rotas de autenticação
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, type = 'student' } = req.body;
        
        // Verificar se usuário já existe
        const existingUser = await query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await query(
            'INSERT INTO users (name, email, password, type) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, type]
        );
        
        const token = jwt.sign(
            { id: result.lastID, email, type },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(201).json({
            message: 'Usuário criado com sucesso',
            token,
            user: { id: result.lastID, name, email, type }
        });
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const users = await query('SELECT * FROM users WHERE email = ? AND active = 1', [email]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
        const token = jwt.sign(
            { id: user.id, email: user.email, type: user.type },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            message: 'Login realizado com sucesso',
            token,
            user: { id: user.id, name: user.name, email: user.email, type: user.type }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rotas de cursos
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await query(`
            SELECT c.*, u.name as teacher_name, cat.name as category_name, cat.color as category_color
            FROM courses c
            LEFT JOIN users u ON c.teacher_id = u.id
            LEFT JOIN categories cat ON c.category_id = cat.id
            WHERE c.status = 'published'
            ORDER BY c.created_at DESC
        `);
        res.json(courses);
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.get('/api/courses/popular', async (req, res) => {
    try {
        const courses = await query(`
            SELECT c.*, u.name as teacher_name, cat.name as category_name, cat.color as category_color
            FROM courses c
            LEFT JOIN users u ON c.teacher_id = u.id
            LEFT JOIN categories cat ON c.category_id = cat.id
            WHERE c.status = 'published'
            ORDER BY c.students_count DESC, c.rating DESC
            LIMIT 6
        `);
        res.json(courses);
    } catch (error) {
        console.error('Erro ao buscar cursos populares:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.get('/api/courses/:id', async (req, res) => {
    try {
        const courses = await query(`
            SELECT c.*, u.name as teacher_name, cat.name as category_name, cat.color as category_color
            FROM courses c
            LEFT JOIN users u ON c.teacher_id = u.id
            LEFT JOIN categories cat ON c.category_id = cat.id
            WHERE c.id = ?
        `, [req.params.id]);
        
        if (courses.length === 0) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        
        const lessons = await query('SELECT * FROM lessons WHERE course_id = ? ORDER BY order_num', [req.params.id]);
        
        res.json({ ...courses[0], lessons });
    } catch (error) {
        console.error('Erro ao buscar curso:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rotas de usuários
app.get('/api/users/teachers', async (req, res) => {
    try {
        const teachers = await query(`
            SELECT id, name, email, avatar, phone, created_at 
            FROM users 
            WHERE type = 'teacher' AND active = 1
            ORDER BY created_at DESC
        `);
        res.json(teachers);
    } catch (error) {
        console.error('Erro ao buscar professores:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.get('/api/users/profile', authenticateToken, async (req, res) => {
    try {
        const users = await query('SELECT * FROM users WHERE id = ? AND active = 1', [req.user.id]);
        if (users.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        
        const stats = await query(`
            SELECT 
                COUNT(e.id) as enrolled_courses,
                COUNT(CASE WHEN e.completed = 1 THEN 1 END) as completed_courses,
                AVG(e.progress) as avg_progress
            FROM enrollments e
            WHERE e.student_id = ?
        `, [req.user.id]);
        
        res.json({ user: users[0], stats: stats[0] });
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rotas de matrículas
app.post('/api/enrollments', authenticateToken, async (req, res) => {
    try {
        const { courseId } = req.body;
        const studentId = req.user.id;
        
        // Verificar se já está matriculado
        const existing = await query('SELECT id FROM enrollments WHERE student_id = ? AND course_id = ?', [studentId, courseId]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Já matriculado neste curso' });
        }
        
        const result = await query('INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)', [studentId, courseId]);
        
        // Atualizar contador de alunos
        await query('UPDATE courses SET students_count = students_count + 1 WHERE id = ?', [courseId]);
        
        res.status(201).json({
            message: 'Matrícula realizada com sucesso',
            enrollmentId: result.lastID
        });
    } catch (error) {
        console.error('Erro na matrícula:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.get('/api/enrollments/my-courses', authenticateToken, async (req, res) => {
    try {
        const enrollments = await query(`
            SELECT e.*, c.title, c.image, c.teacher_id, u.name as teacher_name
            FROM enrollments e
            JOIN courses c ON e.course_id = c.id
            JOIN users u ON c.teacher_id = u.id
            WHERE e.student_id = ?
            ORDER BY e.enrolled_at DESC
        `, [req.user.id]);
        
        res.json(enrollments);
    } catch (error) {
        console.error('Erro ao buscar matrículas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota de teste
app.get('/api/test', async (req, res) => {
    try {
        const result = await query('SELECT COUNT(*) as count FROM users');
        res.json({
            message: 'API StudyConnect+ SQLite funcionando!',
            database: 'SQLite Conectado',
            users: result[0].count,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.json({
            message: 'API StudyConnect+ funcionando!',
            database: 'Erro na conexão',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor SQLite rodando na porta ${PORT}`);
    console.log(`📡 API disponível em: http://localhost:${PORT}/api`);
    console.log(`🗄️ Usando SQLite (sem necessidade de MySQL)`);
});

module.exports = app;