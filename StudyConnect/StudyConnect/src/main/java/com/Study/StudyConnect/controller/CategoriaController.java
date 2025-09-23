package com.Study.StudyConnect.controller;

import com.Study.StudyConnect.model.Categoria;
import com.Study.StudyConnect.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping
    public List<Categoria> getCategorias() {
        return categoriaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Categoria getCategoria(@PathVariable Long id) {
        return categoriaRepository.findById(id).orElse(null);
    }
}