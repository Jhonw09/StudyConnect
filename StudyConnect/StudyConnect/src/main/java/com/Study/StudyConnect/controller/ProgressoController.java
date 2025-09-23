package com.Study.StudyConnect.controller;

import com.Study.StudyConnect.model.*;
import com.Study.StudyConnect.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.time.LocalDateTime;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/progresso")
public class ProgressoController {

    @Autowired
    private ProgressoAulaRepository progressoAulaRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private AulaRepository aulaRepository;

    @PostMapping("/marcar-assistido")
    public ResponseEntity<Map<String, String>> marcarAulaAssistida(@RequestParam Long usuarioId, @RequestParam Long aulaId) {
        Map<String, String> response = new HashMap<>();
        
        Optional<ProgressoAula> progressoExistente = progressoAulaRepository.findByUsuarioIdAndAulaId(usuarioId, aulaId);
        
        if (progressoExistente.isPresent()) {
            ProgressoAula progresso = progressoExistente.get();
            progresso.setAssistido(true);
            progresso.setDataConclusao(LocalDateTime.now());
            progressoAulaRepository.save(progresso);
        } else {
            Optional<Usuario> usuario = usuarioRepository.findById(usuarioId);
            Optional<Aula> aula = aulaRepository.findById(aulaId);
            
            if (usuario.isPresent() && aula.isPresent()) {
                ProgressoAula novoProgresso = new ProgressoAula();
                novoProgresso.setUsuario(usuario.get());
                novoProgresso.setAula(aula.get());
                novoProgresso.setAssistido(true);
                novoProgresso.setDataInicio(LocalDateTime.now());
                novoProgresso.setDataConclusao(LocalDateTime.now());
                progressoAulaRepository.save(novoProgresso);
            }
        }
        
        response.put("success", "true");
        response.put("message", "Aula marcada como assistida!");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> getProgressoUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(progressoAulaRepository.findByUsuarioId(usuarioId));
    }
}