package com.studyconnect.service;

import com.studyconnect.model.Curso;
import com.studyconnect.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CursoService {
    
    @Autowired
    private CursoRepository cursoRepository;
    
    public List<Curso> listarTodos() {
        return cursoRepository.findByAtivoTrue();
    }
    
    public List<Curso> listarPopulares() {
        return cursoRepository.findByPopularTrueAndAtivoTrue();
    }
    
    public List<Curso> listarPorCategoria(Long categoriaId) {
        return cursoRepository.findByCategoriaIdAndAtivoTrue(categoriaId);
    }
    
    public List<Curso> buscarPorTermo(String termo) {
        return cursoRepository.buscarPorTermo(termo);
    }
    
    public Optional<Curso> buscarPorId(Long id) {
        return cursoRepository.findById(id);
    }
    
    public Curso salvar(Curso curso) {
        return cursoRepository.save(curso);
    }
    
    public void deletar(Long id) {
        cursoRepository.deleteById(id);
    }
}