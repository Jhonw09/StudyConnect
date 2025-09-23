package com.Study.StudyConnect.controller;

import com.Study.StudyConnect.model.*;
import com.Study.StudyConnect.repository.*;
import com.Study.StudyConnect.dto.LoginRequest;
import com.Study.StudyConnect.dto.TrocarSenhaRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.util.List;
import java.time.LocalDateTime;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private MatriculaRepository matriculaRepository;
    
    @Autowired
    private FavoritoRepository favoritoRepository;
    
    @Autowired
    private NotificacaoRepository notificacaoRepository;
    
    @Autowired
    private CursoRepository cursoRepository;

    @PostMapping("/cadastrar")
    public ResponseEntity<Map<String, Object>> cadastrar(@RequestBody Usuario usuario) {
        Map<String, Object> response = new HashMap<>();
        
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            response.put("success", false);
            response.put("message", "Email já cadastrado!");
            return ResponseEntity.badRequest().body(response);
        }
        
        Usuario novoUsuario = usuarioRepository.save(usuario);
        response.put("success", true);
        response.put("message", "Usuário cadastrado com sucesso!");
        response.put("usuario", Map.of(
            "id", novoUsuario.getId(),
            "nome", novoUsuario.getNome(),
            "email", novoUsuario.getEmail()
        ));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();
        
        Optional<Usuario> usuario = usuarioRepository.findByEmailAndSenha(
            loginRequest.getEmail(), loginRequest.getSenha()
        );
        
        if (usuario.isPresent() && usuario.get().getAtivo()) {
            Usuario user = usuario.get();
            user.setUltimoAcesso(LocalDateTime.now());
            usuarioRepository.save(user);
            
            response.put("success", true);
            response.put("message", "Login realizado com sucesso!");
            response.put("usuario", Map.of(
                "id", user.getId(),
                "nome", user.getNome(),
                "email", user.getEmail(),
                "fotoUrl", user.getFotoUrl() != null ? user.getFotoUrl() : "images/default-avatar.png"
            ));
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Email ou senha incorretos!");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/trocar-senha")
    public ResponseEntity<Map<String, String>> trocarSenha(@RequestBody TrocarSenhaRequest request) {
        Map<String, String> response = new HashMap<>();
        
        Optional<Usuario> usuario = usuarioRepository.findByEmailAndSenha(
            request.getEmail(), request.getSenhaAtual()
        );
        
        if (usuario.isPresent()) {
            Usuario user = usuario.get();
            user.setSenha(request.getNovaSenha());
            usuarioRepository.save(user);
            
            response.put("success", "true");
            response.put("message", "Senha alterada com sucesso!");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", "false");
            response.put("message", "Senha atual incorreta!");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/excluir/{email}")
    public ResponseEntity<Map<String, String>> excluirConta(@PathVariable String email) {
        Map<String, String> response = new HashMap<>();
        
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        
        if (usuario.isPresent()) {
            usuarioRepository.delete(usuario.get());
            response.put("success", "true");
            response.put("message", "Conta excluída com sucesso!");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", "false");
            response.put("message", "Usuário não encontrado!");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/atualizar-perfil/{id}")
    public ResponseEntity<Map<String, Object>> atualizarPerfil(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
        Map<String, Object> response = new HashMap<>();
        
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        
        if (usuario.isPresent()) {
            Usuario user = usuario.get();
            user.setNome(usuarioAtualizado.getNome());
            user.setBio(usuarioAtualizado.getBio());
            user.setTelefone(usuarioAtualizado.getTelefone());
            user.setDataNascimento(usuarioAtualizado.getDataNascimento());
            user.setGenero(usuarioAtualizado.getGenero());
            user.setCidade(usuarioAtualizado.getCidade());
            user.setEstado(usuarioAtualizado.getEstado());
            if (usuarioAtualizado.getFotoUrl() != null) {
                user.setFotoUrl(usuarioAtualizado.getFotoUrl());
            }
            
            usuarioRepository.save(user);
            
            response.put("success", true);
            response.put("message", "Perfil atualizado com sucesso!");
            response.put("usuario", user);
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Usuário não encontrado!");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/matricular")
    public ResponseEntity<Map<String, String>> matricularCurso(@RequestParam Long usuarioId, @RequestParam Long cursoId) {
        Map<String, String> response = new HashMap<>();
        
        if (matriculaRepository.existsByUsuarioIdAndCursoId(usuarioId, cursoId)) {
            response.put("success", "false");
            response.put("message", "Usuário já matriculado neste curso!");
            return ResponseEntity.badRequest().body(response);
        }
        
        Optional<Usuario> usuario = usuarioRepository.findById(usuarioId);
        Optional<Curso> curso = cursoRepository.findById(cursoId);
        
        if (usuario.isPresent() && curso.isPresent()) {
            Matricula matricula = new Matricula();
            matricula.setUsuario(usuario.get());
            matricula.setCurso(curso.get());
            matriculaRepository.save(matricula);
            
            response.put("success", "true");
            response.put("message", "Matrícula realizada com sucesso!");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", "false");
            response.put("message", "Usuário ou curso não encontrado!");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/meus-cursos/{usuarioId}")
    public List<Matricula> getMeusCursos(@PathVariable Long usuarioId) {
        return matriculaRepository.findByUsuarioId(usuarioId);
    }

    @PostMapping("/favoritar")
    public ResponseEntity<Map<String, String>> favoritarCurso(@RequestParam Long usuarioId, @RequestParam Long cursoId) {
        Map<String, String> response = new HashMap<>();
        
        if (favoritoRepository.existsByUsuarioIdAndCursoId(usuarioId, cursoId)) {
            favoritoRepository.deleteByUsuarioIdAndCursoId(usuarioId, cursoId);
            response.put("success", "true");
            response.put("message", "Curso removido dos favoritos!");
        } else {
            Optional<Usuario> usuario = usuarioRepository.findById(usuarioId);
            Optional<Curso> curso = cursoRepository.findById(cursoId);
            
            if (usuario.isPresent() && curso.isPresent()) {
                Favorito favorito = new Favorito();
                favorito.setUsuario(usuario.get());
                favorito.setCurso(curso.get());
                favoritoRepository.save(favorito);
                
                response.put("success", "true");
                response.put("message", "Curso adicionado aos favoritos!");
            } else {
                response.put("success", "false");
                response.put("message", "Usuário ou curso não encontrado!");
                return ResponseEntity.badRequest().body(response);
            }
        }
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/favoritos/{usuarioId}")
    public List<Favorito> getFavoritos(@PathVariable Long usuarioId) {
        return favoritoRepository.findByUsuarioId(usuarioId);
    }

    @GetMapping("/notificacoes/{usuarioId}")
    public List<Notificacao> getNotificacoes(@PathVariable Long usuarioId) {
        return notificacaoRepository.findByUsuarioIdOrderByDataCriacaoDesc(usuarioId);
    }

    @PutMapping("/marcar-notificacao-lida/{notificacaoId}")
    public ResponseEntity<Map<String, String>> marcarNotificacaoLida(@PathVariable Long notificacaoId) {
        Map<String, String> response = new HashMap<>();
        
        Optional<Notificacao> notificacao = notificacaoRepository.findById(notificacaoId);
        
        if (notificacao.isPresent()) {
            Notificacao notif = notificacao.get();
            notif.setLida(true);
            notificacaoRepository.save(notif);
            
            response.put("success", "true");
            response.put("message", "Notificação marcada como lida!");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", "false");
            response.put("message", "Notificação não encontrada!");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/perfil/{id}")
    public ResponseEntity<Usuario> getPerfil(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}