package com.Study.StudyConnect.repository;

import com.Study.StudyConnect.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}