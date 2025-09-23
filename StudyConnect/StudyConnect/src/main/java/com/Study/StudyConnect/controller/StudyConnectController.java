package com.Study.StudyConnect.controller;

import com.Study.StudyConnect.model.*;
import com.Study.StudyConnect.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@CrossOrigin(origins = "*")
public class StudyConnectController {

    @Autowired
    private CursoRepository cursoRepository;
    
    @Autowired
    private ProfessorRepository professorRepository;
    
    @Autowired
    private ContatoRepository contatoRepository;

    @GetMapping("/cursos")
    public List<Curso> getCursos() {
        return cursoRepository.findByAtivoTrue();
    }

    @GetMapping("/cursos/categoria/{categoriaId}")
    public List<Curso> getCursosByCategoria(@PathVariable Long categoriaId) {
        return cursoRepository.findByCategoriaIdAndAtivoTrue(categoriaId);
    }

    @GetMapping("/professores")
    public List<Professor> getProfessores() {
        return professorRepository.findAll();
    }

    @PostMapping("/contatos")
    public ResponseEntity<Map<String, String>> criarContato(@RequestBody Contato contato) {
        contatoRepository.save(contato);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Mensagem enviada com sucesso!");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("cursos", cursoRepository.count());
        stats.put("professores", professorRepository.count());
        stats.put("contatos", contatoRepository.count());
        return stats;
    }
}