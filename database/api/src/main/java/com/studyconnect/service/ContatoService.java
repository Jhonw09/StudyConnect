package com.studyconnect.service;

import com.studyconnect.model.Contato;
import com.studyconnect.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ContatoService {
    
    @Autowired
    private ContatoRepository contatoRepository;
    
    public Contato salvar(Contato contato) {
        return contatoRepository.save(contato);
    }
    
    public List<Contato> listarTodos() {
        return contatoRepository.findAll();
    }
    
    public Optional<Contato> buscarPorId(Long id) {
        return contatoRepository.findById(id);
    }
}