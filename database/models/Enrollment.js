const { query } = require('../config/database');

class Enrollment {
    // Matricular aluno
    static async create(studentId, courseId) {
        const sql = `
            INSERT INTO enrollments (student_id, course_id)
            VALUES (?, ?)
        `;
        
        const result = await query(sql, [studentId, courseId]);
        return result.insertId;
    }

    // Verificar se aluno está matriculado
    static async isEnrolled(studentId, courseId) {
        const sql = 'SELECT id FROM enrollments WHERE student_id = ? AND course_id = ?';
        const enrollments = await query(sql, [studentId, courseId]);
        return enrollments.length > 0;
    }

    // Buscar matrículas do aluno
    static async findByStudent(studentId) {
        const sql = `
            SELECT e.*, c.title, c.image, c.teacher_id, u.name as teacher_name
            FROM enrollments e
            JOIN courses c ON e.course_id = c.id
            JOIN users u ON c.teacher_id = u.id
            WHERE e.student_id = ?
            ORDER BY e.enrolled_at DESC
        `;
        
        return await query(sql, [studentId]);
    }

    // Buscar alunos do curso
    static async findByCourse(courseId) {
        const sql = `
            SELECT e.*, u.name, u.email, u.avatar
            FROM enrollments e
            JOIN users u ON e.student_id = u.id
            WHERE e.course_id = ?
            ORDER BY e.enrolled_at DESC
        `;
        
        return await query(sql, [courseId]);
    }

    // Atualizar progresso
    static async updateProgress(studentId, courseId, progress) {
        const sql = `
            UPDATE enrollments 
            SET progress = ?, completed = ?, completed_at = ?
            WHERE student_id = ? AND course_id = ?
        `;
        
        const completed = progress >= 100;
        const completedAt = completed ? new Date() : null;
        
        await query(sql, [progress, completed, completedAt, studentId, courseId]);
    }

    // Calcular progresso baseado nas aulas
    static async calculateProgress(studentId, courseId) {
        const sql = `
            SELECT 
                COUNT(l.id) as total_lessons,
                COUNT(lp.id) as completed_lessons
            FROM lessons l
            LEFT JOIN lesson_progress lp ON l.id = lp.lesson_id AND lp.student_id = ? AND lp.completed = TRUE
            WHERE l.course_id = ?
        `;
        
        const result = await query(sql, [studentId, courseId]);
        const { total_lessons, completed_lessons } = result[0];
        
        if (total_lessons === 0) return 0;
        
        const progress = (completed_lessons / total_lessons) * 100;
        await this.updateProgress(studentId, courseId, progress);
        
        return progress;
    }

    // Estatísticas gerais
    static async getStats() {
        const sql = `
            SELECT 
                COUNT(*) as total_enrollments,
                COUNT(CASE WHEN completed = TRUE THEN 1 END) as completed_enrollments,
                AVG(progress) as avg_progress
            FROM enrollments
        `;
        
        const stats = await query(sql);
        return stats[0];
    }
}

module.exports = Enrollment;