package com.studyconnect.controller;

import com.studyconnect.model.Curso;
import com.studyconnect.service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cursos")
@CrossOrigin(origins = "*")
public class CursoController {
    
    @Autowired
    private CursoService cursoService;
    
    @GetMapping
    public ResponseEntity<List<Curso>> listarTodos() {
        return ResponseEntity.ok(cursoService.listarTodos());
    }
    
    @GetMapping("/populares")
    public ResponseEntity<List<Curso>> listarPopulares() {
        return ResponseEntity.ok(cursoService.listarPopulares());
    }
    
    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<List<Curso>> listarPorCategoria(@PathVariable Long categoriaId) {
        return ResponseEntity.ok(cursoService.listarPorCategoria(categoriaId));
    }
    
    @GetMapping("/buscar")
    public ResponseEntity<List<Curso>> buscar(@RequestParam String termo) {
        return ResponseEntity.ok(cursoService.buscarPorTermo(termo));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Curso> buscarPorId(@PathVariable Long id) {
        return cursoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Curso> criar(@RequestBody Curso curso) {
        return ResponseEntity.ok(cursoService.salvar(curso));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Curso> atualizar(@PathVariable Long id, @RequestBody Curso curso) {
        curso.setId(id);
        return ResponseEntity.ok(cursoService.salvar(curso));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        cursoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}