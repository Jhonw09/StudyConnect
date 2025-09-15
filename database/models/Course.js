const { query } = require('../config/database');

class Course {
    // Criar curso
    static async create(courseData) {
        const { title, description, price, level, duration, image, teacher_id, category_id } = courseData;
        
        const sql = `
            INSERT INTO courses (title, description, price, level, duration, image, teacher_id, category_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const result = await query(sql, [title, description, price, level, duration, image, teacher_id, category_id]);
        return result.insertId;
    }

    // Buscar curso por ID
    static async findById(id) {
        const sql = `
            SELECT c.*, u.name as teacher_name, cat.name as category_name, cat.color as category_color
            FROM courses c
            LEFT JOIN users u ON c.teacher_id = u.id
            LEFT JOIN categories cat ON c.category_id = cat.id
            WHERE c.id = ?
        `;
        
        const courses = await query(sql, [id]);
        return courses[0] || null;
    }

    // Listar cursos com filtros
    static async findAll(filters = {}) {
        let sql = `
            SELECT c.*, u.name as teacher_name, cat.name as category_name, cat.color as category_color
            FROM courses c
            LEFT JOIN users u ON c.teacher_id = u.id
            LEFT JOIN categories cat ON c.category_id = cat.id
            WHERE c.status = 'published'
        `;
        
        const params = [];
        
        if (filters.category_id) {
            sql += ' AND c.category_id = ?';
            params.push(filters.category_id);
        }
        
        if (filters.level) {
            sql += ' AND c.level = ?';
            params.push(filters.level);
        }
        
        if (filters.teacher_id) {
            sql += ' AND c.teacher_id = ?';
            params.push(filters.teacher_id);
        }
        
        sql += ' ORDER BY c.created_at DESC';
        
        if (filters.limit) {
            sql += ' LIMIT ?';
            params.push(parseInt(filters.limit));
        }
        
        return await query(sql, params);
    }

    // Buscar cursos populares
    static async findPopular(limit = 6) {
        const sql = `
            SELECT c.*, u.name as teacher_name, cat.name as category_name, cat.color as category_color
            FROM courses c
            LEFT JOIN users u ON c.teacher_id = u.id
            LEFT JOIN categories cat ON c.category_id = cat.id
            WHERE c.status = 'published'
            ORDER BY c.students_count DESC, c.rating DESC
            LIMIT ?
        `;
        
        return await query(sql, [limit]);
    }

    // Atualizar curso
    static async update(id, courseData) {
        const { title, description, price, level, duration, image, category_id } = courseData;
        
        const sql = `
            UPDATE courses 
            SET title = ?, description = ?, price = ?, level = ?, duration = ?, image = ?, category_id = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        
        await query(sql, [title, description, price, level, duration, image, category_id, id]);
        return this.findById(id);
    }

    // Atualizar estatísticas do curso
    static async updateStats(courseId) {
        // Atualizar número de alunos
        const updateStudents = `
            UPDATE courses 
            SET students_count = (
                SELECT COUNT(*) FROM enrollments WHERE course_id = ?
            )
            WHERE id = ?
        `;
        
        // Atualizar rating médio
        const updateRating = `
            UPDATE courses 
            SET rating = (
                SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE course_id = ?
            )
            WHERE id = ?
        `;
        
        await query(updateStudents, [courseId, courseId]);
        await query(updateRating, [courseId, courseId]);
    }

    // Buscar aulas do curso
    static async getLessons(courseId) {
        const sql = `
            SELECT * FROM lessons 
            WHERE course_id = ? 
            ORDER BY order_num ASC
        `;
        
        return await query(sql, [courseId]);
    }
}

module.exports = Course;