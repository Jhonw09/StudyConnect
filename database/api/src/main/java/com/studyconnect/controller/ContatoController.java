package com.studyconnect.controller;

import com.studyconnect.model.Contato;
import com.studyconnect.service.ContatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/contatos")
@CrossOrigin(origins = "*")
public class ContatoController {
    
    @Autowired
    private ContatoService contatoService;
    
    @PostMapping
    public ResponseEntity<Contato> enviarContato(@RequestBody Contato contato) {
        return ResponseEntity.ok(contatoService.salvar(contato));
    }
    
    @GetMapping
    public ResponseEntity<List<Contato>> listarTodos() {
        return ResponseEntity.ok(contatoService.listarTodos());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Contato> buscarPorId(@PathVariable Long id) {
        return contatoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}