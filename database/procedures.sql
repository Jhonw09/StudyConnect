USE StudyConnectPlus;
GO

-- Procedure para autenticação de usuário
CREATE PROCEDURE sp_AutenticarUsuario
    @email NVARCHAR(100),
    @senha NVARCHAR(255)
AS
BEGIN
    SELECT u.id, u.nome, u.email, u.tipo, p.id as professor_id
    FROM usuarios u
    LEFT JOIN professores p ON u.id = p.usuario_id
    WHERE u.email = @email AND u.senha = @senha AND u.ativo = 1;
END;
GO

-- Procedure para obter cursos por categoria
CREATE PROCEDURE sp_ObterCursosPorCategoria
    @categoria_id INT = NULL
AS
BEGIN
    SELECT c.*, cat.nome as categoria_nome, u.nome as professor_nome, p.avaliacao as professor_avaliacao
    FROM cursos c
    INNER JOIN categorias cat ON c.categoria_id = cat.id
    INNER JOIN professores p ON c.professor_id = p.id
    INNER JOIN usuarios u ON p.usuario_id = u.id
    WHERE (@categoria_id IS NULL OR c.categoria_id = @categoria_id) AND c.ativo = 1
    ORDER BY c.popular DESC, c.avaliacao DESC;
END;
GO

-- Procedure para matricular aluno
CREATE PROCEDURE sp_MatricularAluno
    @aluno_id INT,
    @curso_id INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM matriculas WHERE aluno_id = @aluno_id AND curso_id = @curso_id)
    BEGIN
        INSERT INTO matriculas (aluno_id, curso_id) VALUES (@aluno_id, @curso_id);
        UPDATE cursos SET total_alunos = total_alunos + 1 WHERE id = @curso_id;
        SELECT 'Matrícula realizada com sucesso!' as mensagem;
    END
    ELSE
    BEGIN
        SELECT 'Aluno já matriculado neste curso!' as mensagem;
    END
END;
GO

-- Procedure para atualizar progresso
CREATE PROCEDURE sp_AtualizarProgresso
    @matricula_id INT,
    @aula_id INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM progresso_aulas WHERE matricula_id = @matricula_id AND aula_id = @aula_id)
    BEGIN
        INSERT INTO progresso_aulas (matricula_id, aula_id, assistido, data_visualizacao) 
        VALUES (@matricula_id, @aula_id, 1, GETDATE());
    END
    ELSE
    BEGIN
        UPDATE progresso_aulas 
        SET assistido = 1, data_visualizacao = GETDATE() 
        WHERE matricula_id = @matricula_id AND aula_id = @aula_id;
    END
    
    -- Calcular progresso total
    DECLARE @total_aulas INT, @aulas_assistidas INT, @progresso DECIMAL(5,2);
    
    SELECT @total_aulas = COUNT(*) 
    FROM aulas a 
    INNER JOIN matriculas m ON a.curso_id = m.curso_id 
    WHERE m.id = @matricula_id;
    
    SELECT @aulas_assistidas = COUNT(*) 
    FROM progresso_aulas 
    WHERE matricula_id = @matricula_id AND assistido = 1;
    
    SET @progresso = (@aulas_assistidas * 100.0) / @total_aulas;
    
    UPDATE matriculas 
    SET progresso = @progresso, 
        concluido = CASE WHEN @progresso = 100 THEN 1 ELSE 0 END,
        data_conclusao = CASE WHEN @progresso = 100 THEN GETDATE() ELSE NULL END
    WHERE id = @matricula_id;
END;
GO