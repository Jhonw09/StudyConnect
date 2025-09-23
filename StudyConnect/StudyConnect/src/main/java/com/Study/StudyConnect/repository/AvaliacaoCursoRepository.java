package com.Study.StudyConnect.repository;

import com.Study.StudyConnect.model.AvaliacaoCurso;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AvaliacaoCursoRepository extends JpaRepository<AvaliacaoCurso, Long> {
    List<AvaliacaoCurso> findByCursoId(Long cursoId);
    List<AvaliacaoCurso> findByUsuarioId(Long usuarioId);
}