const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { testConnection } = require('../config/database');
require('dotenv').config({ path: '../config/.env' });

// Importar modelos
const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

const app = express();
const PORT = process.env.PORT || 3001;

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

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
};

// Rotas de autenticação
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, type } = req.body;
        
        // Verificar se usuário já existe
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        
        const userId = await User.create({ name, email, password, type });
        const user = await User.findById(userId);
        
        const token = jwt.sign(
            { id: user.id, email: user.email, type: user.type },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(201).json({
            message: 'Usuário criado com sucesso',
            token,
            user: { id: user.id, name: user.name, email: user.email, type: user.type }
        });
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
        const validPassword = await User.verifyPassword(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
        const token = jwt.sign(
            { id: user.id, email: user.email, type: user.type },
            process.env.JWT_SECRET,
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

// Rotas de usuários
app.get('/api/users/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        
        const stats = await User.getStats(user.id);
        res.json({ user, stats });
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.get('/api/users/teachers', async (req, res) => {
    try {
        const teachers = await User.findAll('teacher');
        res.json(teachers);
    } catch (error) {
        console.error('Erro ao buscar professores:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rotas de cursos
app.get('/api/courses', async (req, res) => {
    try {
        const { category, level, teacher, limit } = req.query;
        const filters = {};
        
        if (category) filters.category_id = category;
        if (level) filters.level = level;
        if (teacher) filters.teacher_id = teacher;
        if (limit) filters.limit = limit;
        
        const courses = await Course.findAll(filters);
        res.json(courses);
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.get('/api/courses/popular', async (req, res) => {
    try {
        const { limit = 6 } = req.query;
        const courses = await Course.findPopular(parseInt(limit));
        res.json(courses);
    } catch (error) {
        console.error('Erro ao buscar cursos populares:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.get('/api/courses/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        
        const lessons = await Course.getLessons(course.id);
        res.json({ ...course, lessons });
    } catch (error) {
        console.error('Erro ao buscar curso:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rotas de matrículas
app.post('/api/enrollments', authenticateToken, async (req, res) => {
    try {
        const { courseId } = req.body;
        const studentId = req.user.id;
        
        // Verificar se já está matriculado
        const isEnrolled = await Enrollment.isEnrolled(studentId, courseId);
        if (isEnrolled) {
            return res.status(400).json({ error: 'Já matriculado neste curso' });
        }
        
        const enrollmentId = await Enrollment.create(studentId, courseId);
        await Course.updateStats(courseId);
        
        res.status(201).json({
            message: 'Matrícula realizada com sucesso',
            enrollmentId
        });
    } catch (error) {
        console.error('Erro na matrícula:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.get('/api/enrollments/my-courses', authenticateToken, async (req, res) => {
    try {
        const enrollments = await Enrollment.findByStudent(req.user.id);
        res.json(enrollments);
    } catch (error) {
        console.error('Erro ao buscar matrículas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota de teste
app.get('/api/test', async (req, res) => {
    const dbConnected = await testConnection();
    res.json({
        message: 'API StudyConnect+ funcionando!',
        database: dbConnected ? 'Conectado' : 'Desconectado',
        timestamp: new Date().toISOString()
    });
});

// Iniciar servidor
app.listen(PORT, async () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📡 API disponível em: http://localhost:${PORT}/api`);
    
    // Testar conexão com banco
    await testConnection();
});

module.exports = app;