package com.Study.StudyConnect.repository;

import com.Study.StudyConnect.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface CursoRepository extends JpaRepository<Curso, Long> {
    List<Curso> findByAtivoTrue();
    
    @Query("SELECT c FROM Curso c WHERE c.categoria.id = :categoriaId AND c.ativo = true")
    List<Curso> findByCategoriaIdAndAtivoTrue(@Param("categoriaId") Long categoriaId);
}