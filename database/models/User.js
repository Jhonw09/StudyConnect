const { query } = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    // Criar usuário
    static async create(userData) {
        const { name, email, password, type = 'student', avatar, phone } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const sql = `
            INSERT INTO users (name, email, password, type, avatar, phone)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        const result = await query(sql, [name, email, hashedPassword, type, avatar, phone]);
        return result.insertId;
    }

    // Buscar por email
    static async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ? AND active = TRUE';
        const users = await query(sql, [email]);
        return users[0] || null;
    }

    // Buscar por ID
    static async findById(id) {
        const sql = 'SELECT * FROM users WHERE id = ? AND active = TRUE';
        const users = await query(sql, [id]);
        return users[0] || null;
    }

    // Listar todos os usuários
    static async findAll(type = null) {
        let sql = 'SELECT id, name, email, type, avatar, phone, created_at FROM users WHERE active = TRUE';
        const params = [];
        
        if (type) {
            sql += ' AND type = ?';
            params.push(type);
        }
        
        sql += ' ORDER BY created_at DESC';
        return await query(sql, params);
    }

    // Atualizar usuário
    static async update(id, userData) {
        const { name, email, avatar, phone } = userData;
        const sql = `
            UPDATE users 
            SET name = ?, email = ?, avatar = ?, phone = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        
        await query(sql, [name, email, avatar, phone, id]);
        return this.findById(id);
    }

    // Verificar senha
    static async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    // Estatísticas do usuário
    static async getStats(userId) {
        const sql = `
            SELECT 
                COUNT(e.id) as enrolled_courses,
                COUNT(CASE WHEN e.completed = TRUE THEN 1 END) as completed_courses,
                AVG(e.progress) as avg_progress
            FROM enrollments e
            WHERE e.student_id = ?
        `;
        
        const stats = await query(sql, [userId]);
        return stats[0];
    }
}

module.exports = User;