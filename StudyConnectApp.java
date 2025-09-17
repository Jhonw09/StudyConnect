package com.studyconnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@SpringBootApplication
public class StudyConnectApp {
    public static void main(String[] args) {
        SpringApplication.run(StudyConnectApp.class, args);
        System.out.println("🚀 StudyConnect+ API iniciada em http://localhost:8080/api");
    }
}

// ========== ENTITIES ==========

@Entity
@Table(name = "usuarios")
class Usuario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String tipo;
    private Boolean ativo;
    @Column(name = "criado_em")
    private LocalDateTime criadoEm;
    
    // Getters e Setters
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public String getTipo() { return tipo; }
    public Boolean getAtivo() { return ativo; }
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setId(Long id) { this.id = id; }
    public void setNome(String nome) { this.nome = nome; }
    public void setEmail(String email) { this.email = email; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
}

@Entity
@Table(name = "categorias")
class Categoria {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String icone;
    private String cor;
    
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getIcone() { return icone; }
    public String getCor() { return cor; }
    public void setId(Long id) { this.id = id; }
    public void setNome(String nome) { this.nome = nome; }
    public void setIcone(String icone) { this.icone = icone; }
    public void setCor(String cor) { this.cor = cor; }
}

@Entity
@Table(name = "professores")
class Professor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "usuario_id")
    private Long usuarioId;
    private String especialidade;
    private String biografia;
    private BigDecimal avaliacao;
    @Column(name = "total_alunos")
    private Integer totalAlunos;
    private Boolean online;
    private String linkedin;
    private String github;
    
    // Join com Usuario para pegar nome
    @Transient
    private String nome;
    
    public Long getId() { return id; }
    public Long getUsuarioId() { return usuarioId; }
    public String getEspecialidade() { return especialidade; }
    public String getBiografia() { return biografia; }
    public BigDecimal getAvaliacao() { return avaliacao; }
    public Integer getTotalAlunos() { return totalAlunos; }
    public Boolean getOnline() { return online; }
    public String getLinkedin() { return linkedin; }
    public String getGithub() { return github; }
    public String getNome() { return nome; }
    public void setId(Long id) { this.id = id; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public void setEspecialidade(String especialidade) { this.especialidade = especialidade; }
    public void setBiografia(String biografia) { this.biografia = biografia; }
    public void setAvaliacao(BigDecimal avaliacao) { this.avaliacao = avaliacao; }
    public void setTotalAlunos(Integer totalAlunos) { this.totalAlunos = totalAlunos; }
    public void setOnline(Boolean online) { this.online = online; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }
    public void setGithub(String github) { this.github = github; }
    public void setNome(String nome) { this.nome = nome; }
}

@Entity
@Table(name = "cursos")
class Curso {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descricao;
    @Column(name = "professor_id")
    private Long professorId;
    @Column(name = "categoria_id")
    private Long categoriaId;
    private String nivel;
    @Column(name = "duracao_horas")
    private Integer duracaoHoras;
    private BigDecimal avaliacao;
    @Column(name = "total_alunos")
    private Integer totalAlunos;
    private Boolean popular;
    private String imagem;
    private Boolean ativo;
    
    public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public String getDescricao() { return descricao; }
    public Long getProfessorId() { return professorId; }
    public Long getCategoriaId() { return categoriaId; }
    public String getNivel() { return nivel; }
    public Integer getDuracaoHoras() { return duracaoHoras; }
    public BigDecimal getAvaliacao() { return avaliacao; }
    public Integer getTotalAlunos() { return totalAlunos; }
    public Boolean getPopular() { return popular; }
    public String getImagem() { return imagem; }
    public Boolean getAtivo() { return ativo; }
    public void setId(Long id) { this.id = id; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public void setProfessorId(Long professorId) { this.professorId = professorId; }
    public void setCategoriaId(Long categoriaId) { this.categoriaId = categoriaId; }
    public void setNivel(String nivel) { this.nivel = nivel; }
    public void setDuracaoHoras(Integer duracaoHoras) { this.duracaoHoras = duracaoHoras; }
    public void setAvaliacao(BigDecimal avaliacao) { this.avaliacao = avaliacao; }
    public void setTotalAlunos(Integer totalAlunos) { this.totalAlunos = totalAlunos; }
    public void setPopular(Boolean popular) { this.popular = popular; }
    public void setImagem(String imagem) { this.imagem = imagem; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
}

@Entity
@Table(name = "contatos")
class Contato {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String assunto;
    private String mensagem;
    @Column(name = "criado_em")
    private LocalDateTime criadoEm;
    
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public String getAssunto() { return assunto; }
    public String getMensagem() { return mensagem; }
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setId(Long id) { this.id = id; }
    public void setNome(String nome) { this.nome = nome; }
    public void setEmail(String email) { this.email = email; }
    public void setAssunto(String assunto) { this.assunto = assunto; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
}

// ========== REPOSITORIES ==========

interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    @Query("SELECT COUNT(u) FROM Usuario u WHERE u.tipo = 'ALUNO' AND u.ativo = true")
    long countAlunos();
}

interface CategoriaRepository extends JpaRepository<Categoria, Long> {}

interface ProfessorRepository extends JpaRepository<Professor, Long> {
    @Query("SELECT p, u.nome FROM Professor p JOIN Usuario u ON p.usuarioId = u.id")
    List<Object[]> findProfessoresComNome();
}

interface CursoRepository extends JpaRepository<Curso, Long> {
    List<Curso> findByAtivoTrue();
    List<Curso> findByCategoriaIdAndAtivoTrue(Long categoriaId);
    List<Curso> findByPopularTrueAndAtivoTrue();
    
    @Query("SELECT COUNT(c) FROM Curso c WHERE c.ativo = true")
    long countAtivos();
}

interface ContatoRepository extends JpaRepository<Contato, Long> {}

// ========== CONTROLLER ==========

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
class ApiController {
    
    @Autowired private UsuarioRepository usuarioRepo;
    @Autowired private CategoriaRepository categoriaRepo;
    @Autowired private ProfessorRepository professorRepo;
    @Autowired private CursoRepository cursoRepo;
    @Autowired private ContatoRepository contatoRepo;
    
    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "UP");
        status.put("timestamp", LocalDateTime.now().toString());
        return status;
    }
    
    @GetMapping("/cursos")
    public List<Curso> getCursos() {
        return cursoRepo.findByAtivoTrue();
    }
    
    @GetMapping("/cursos/categoria/{id}")
    public List<Curso> getCursosPorCategoria(@PathVariable Long id) {
        return cursoRepo.findByCategoriaIdAndAtivoTrue(id);
    }
    
    @GetMapping("/cursos/populares")
    public List<Curso> getCursosPopulares() {
        return cursoRepo.findByPopularTrueAndAtivoTrue();
    }
    
    @GetMapping("/professores")
    public List<Professor> getProfessores() {
        List<Object[]> results = professorRepo.findProfessoresComNome();
        return results.stream().map(result -> {
            Professor prof = (Professor) result[0];
            prof.setNome((String) result[1]);
            return prof;
        }).toList();
    }
    
    @PostMapping("/contatos")
    public Map<String, Object> enviarContato(@RequestBody Contato contato) {
        contato.setCriadoEm(LocalDateTime.now());
        Contato saved = contatoRepo.save(contato);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("id", saved.getId());
        response.put("message", "Contato enviado com sucesso!");
        return response;
    }
    
    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("cursos", cursoRepo.countAtivos());
        stats.put("alunos", usuarioRepo.countAlunos());
        stats.put("professores", professorRepo.count());
        return stats;
    }
}