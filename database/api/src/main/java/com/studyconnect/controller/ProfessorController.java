package com.studyconnect.controller;

import com.studyconnect.model.Professor;
import com.studyconnect.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/professores")
@CrossOrigin(origins = "*")
public class ProfessorController {
    
    @Autowired
    private ProfessorService professorService;
    
    @GetMapping
    public ResponseEntity<List<Professor>> listarTodos() {
        return ResponseEntity.ok(professorService.listarTodos());
    }
    
    @GetMapping("/online")
    public ResponseEntity<List<Professor>> listarOnline() {
        return ResponseEntity.ok(professorService.listarOnline());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Professor> buscarPorId(@PathVariable Long id) {
        return professorService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}