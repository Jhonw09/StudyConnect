package com.Study.StudyConnect.repository;

import com.Study.StudyConnect.model.Aula;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AulaRepository extends JpaRepository<Aula, Long> {
    List<Aula> findByCursoIdAndAtivoTrueOrderByOrdem(Long cursoId);
}