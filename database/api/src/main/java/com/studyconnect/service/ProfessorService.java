package com.studyconnect.service;

import com.studyconnect.model.Professor;
import com.studyconnect.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProfessorService {
    
    @Autowired
    private ProfessorRepository professorRepository;
    
    public List<Professor> listarTodos() {
        return professorRepository.findAll();
    }
    
    public List<Professor> listarOnline() {
        return professorRepository.findByStatusOnlineTrue();
    }
    
    public Optional<Professor> buscarPorId(Long id) {
        return professorRepository.findById(id);
    }
}