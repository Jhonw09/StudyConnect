package com.studyconnect.repository;

import com.studyconnect.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
    
    List<Curso> findByAtivoTrue();
    
    List<Curso> findByPopularTrueAndAtivoTrue();
    
    List<Curso> findByCategoriaIdAndAtivoTrue(Long categoriaId);
    
    @Query("SELECT c FROM Curso c WHERE c.ativo = true AND " +
           "(LOWER(c.titulo) LIKE LOWER(CONCAT('%', :termo, '%')) OR " +
           "LOWER(c.descricao) LIKE LOWER(CONCAT('%', :termo, '%')))")
    List<Curso> buscarPorTermo(@Param("termo") String termo);
    
    @Query("SELECT c FROM Curso c WHERE c.ativo = true ORDER BY c.totalAlunos DESC")
    List<Curso> findMaisPopulares();
}