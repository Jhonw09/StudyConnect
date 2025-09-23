package com.Study.StudyConnect.repository;

import com.Study.StudyConnect.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
}