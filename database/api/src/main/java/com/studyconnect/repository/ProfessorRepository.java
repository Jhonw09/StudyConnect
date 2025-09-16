package com.studyconnect.repository;

import com.studyconnect.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    
    List<Professor> findByStatusOnlineTrue();
    
    List<Professor> findByOrderByAvaliacaoDesc();
}