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
public class StudyConnectApplication {
    public static void main(String[] args) {
        SpringApplication.run(StudyConnectApplication.class, args);
    }
}

// ========== ENTITIES ==========

@Entity
@Table(name = "usuarios")
class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String tipo;
    private String avatar;
    private String telefone;
    private Boolean ativo;
    @Column(name = "criado_em")
    private LocalDateTime criadoEm;
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
}

@Entity
@Table(name = "categorias")
class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    private String icone;
    private String cor;
    private Boolean ativo;
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public String getIcone() { return icone; }
    public void setIcone(String icone) { this.icone = icone; }
    public String getCor() { return cor; }
    public void setCor(String cor) { this.cor = cor; }
    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
}

@Entity
@Table(name = "professores")
class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "usuario_id")
    private Long usuarioId;
    private String especialidade;
    private String biografia;
    private BigDecimal avaliacao;
    @Column(name = "total_alunos")
    private Integer totalAlunos;
    @Column(name = "total_cursos")
    private Integer totalCursos;
    private Boolean online;
    private String linkedin;
    private String github;
    private String website;
    private Boolean aprovado;
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public String getEspecialidade() { return especialidade; }
    public void setEspecialidade(String especialidade) { this.especialidade = especialidade; }
    public String getBiografia() { return biografia; }
    public void setBiografia(String biografia) { this.biografia = biografia; }
    public BigDecimal getAvaliacao() { return avaliacao; }
    public void setAvaliacao(BigDecimal avaliacao) { this.avaliacao = avaliacao; }
    public Integer getTotalAlunos() { return totalAlunos; }
    public void setTotalAlunos(Integer totalAlunos) { this.totalAlunos = totalAlunos; }
    public Integer getTotalCursos() { return totalCursos; }
    public void setTotalCursos(Integer totalCursos) { this.totalCursos = totalCursos; }
    public Boolean getOnline() { return online; }
    public void setOnline(Boolean online) { this.online = online; }
    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }
    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
    public Boolean getAprovado() { return aprovado; }
    public void setAprovado(Boolean aprovado) { this.aprovado = aprovado; }
}

@Entity
@Table(name = "cursos")
class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descricao;
    @Column(name = "professor_id")
    private Long professorId;
    @Column(name = "categoria_id")
    private Long categoriaId;
    private BigDecimal preco;
    private String nivel;
    @Column(name = "duracao_horas")
    private Integer duracaoHoras;
    @Column(name = "total_aulas")
    private Integer totalAulas;
    private BigDecimal avaliacao;
    @Column(name = "total_avaliacoes")
    private Integer totalAvaliacoes;
    @Column(name = "total_alunos")
    private Integer totalAlunos;
    private Boolean popular;
    private Boolean destaque;
    private String imagem;
    private Boolean ativo;
    @Column(name = "criado_em")
    private LocalDateTime criadoEm;
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public Long getProfessorId() { return professorId; }
    public void setProfessorId(Long professorId) { this.professorId = professorId; }
    public Long getCategoriaId() { return categoriaId; }
    public void setCategoriaId(Long categoriaId) { this.categoriaId = categoriaId; }
    public BigDecimal getPreco() { return preco; }
    public void setPreco(BigDecimal preco) { this.preco = preco; }
    public String getNivel() { return nivel; }
    public void setNivel(String nivel) { this.nivel = nivel; }
    public Integer getDuracaoHoras() { return duracaoHoras; }
    public void setDuracaoHoras(Integer duracaoHoras) { this.duracaoHoras = duracaoHoras; }
    public Integer getTotalAulas() { return totalAulas; }
    public void setTotalAulas(Integer totalAulas) { this.totalAulas = totalAulas; }
    public BigDecimal getAvaliacao() { return avaliacao; }
    public void setAvaliacao(BigDecimal avaliacao) { this.avaliacao = avaliacao; }
    public Integer getTotalAvaliacoes() { return totalAvaliacoes; }
    public void setTotalAvaliacoes(Integer totalAvaliacoes) { this.totalAvaliacoes = totalAvaliacoes; }
    public Integer getTotalAlunos() { return totalAlunos; }
    public void setTotalAlunos(Integer totalAlunos) { this.totalAlunos = totalAlunos; }
    public Boolean getPopular() { return popular; }
    public void setPopular(Boolean popular) { this.popular = popular; }
    public Boolean getDestaque() { return destaque; }
    public void setDestaque(Boolean destaque) { this.destaque = destaque; }
    public String getImagem() { return imagem; }
    public void setImagem(String imagem) { this.imagem = imagem; }
    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
}

@Entity
@Table(name = "contatos")
class Contato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private String assunto;
    private String mensagem;
    private String tipo;
    private Boolean respondido;
    private String resposta;
    @Column(name = "data_resposta")
    private LocalDateTime dataResposta;
    @Column(name = "criado_em")
    private LocalDateTime criadoEm;
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    public String getAssunto() { return assunto; }
    public void setAssunto(String assunto) { this.assunto = assunto; }
    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public Boolean getRespondido() { return respondido; }
    public void setRespondido(Boolean respondido) { this.respondido = respondido; }
    public String getResposta() { return resposta; }
    public void setResposta(String resposta) { this.resposta = resposta; }
    public LocalDateTime getDataResposta() { return dataResposta; }
    public void setDataResposta(LocalDateTime dataResposta) { this.dataResposta = dataResposta; }
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
}

// ========== REPOSITORIES ==========

interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    @Query("SELECT COUNT(u) FROM Usuario u WHERE u.tipo = 'ALUNO' AND u.ativo = true")
    long countAlunos();
    
    @Query("SELECT COUNT(u) FROM Usuario u WHERE u.tipo = 'PROFESSOR' AND u.ativo = true")
    long countProfessores();
}

interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    List<Categoria> findByAtivoTrue();
}

interface ProfessorRepository extends JpaRepository<Professor, Long> {
    List<Professor> findByAprovadoTrue();
    
    @Query("SELECT COUNT(p) FROM Professor p WHERE p.aprovado = true")
    long countAprovados();
}

interface CursoRepository extends JpaRepository<Curso, Long> {
    List<Curso> findByAtivoTrue();
    List<Curso> findByCategoriaIdAndAtivoTrue(Long categoriaId);
    List<Curso> findByPopularTrueAndAtivoTrue();
    List<Curso> findByDestaqueTrueAndAtivoTrue();
    
    @Query("SELECT COUNT(c) FROM Curso c WHERE c.ativo = true")
    long countAtivos();
}

interface ContatoRepository extends JpaRepository<Contato, Long> {
}

// ========== CONTROLLERS ==========

@RestController
@CrossOrigin(origins = "*")
class ApiController {
    
    @Autowired private UsuarioRepository usuarioRepo;
    @Autowired private CategoriaRepository categoriaRepo;
    @Autowired private ProfessorRepository professorRepo;
    @Autowired private CursoRepository cursoRepo;
    @Autowired private ContatoRepository contatoRepo;
    
    // Cursos
    @GetMapping("/cursos")
    public List<Curso> getCursos() {
        return cursoRepo.findByAtivoTrue();
    }
    
    @GetMapping("/cursos/{id}")
    public Curso getCurso(@PathVariable Long id) {
        return cursoRepo.findById(id).orElse(null);
    }
    
    @GetMapping("/cursos/categoria/{id}")
    public List<Curso> getCursosPorCategoria(@PathVariable Long id) {
        return cursoRepo.findByCategoriaIdAndAtivoTrue(id);
    }
    
    @GetMapping("/cursos/populares")
    public List<Curso> getCursosPopulares() {
        return cursoRepo.findByPopularTrueAndAtivoTrue();
    }
    
    @GetMapping("/cursos/destaques")
    public List<Curso> getCursosDestaque() {
        return cursoRepo.findByDestaqueTrueAndAtivoTrue();
    }
    
    // Categorias
    @GetMapping("/categorias")
    public List<Categoria> getCategorias() {
        return categoriaRepo.findByAtivoTrue();
    }
    
    // Professores
    @GetMapping("/professores")
    public List<Professor> getProfessores() {
        return professorRepo.findByAprovadoTrue();
    }
    
    @GetMapping("/professores/{id}")
    public Professor getProfessor(@PathVariable Long id) {
        return professorRepo.findById(id).orElse(null);
    }
    
    // Contatos
    @PostMapping("/contatos")
    public Contato enviarContato(@RequestBody Contato contato) {
        contato.setCriadoEm(LocalDateTime.now());
        contato.setRespondido(false);
        return contatoRepo.save(contato);
    }
    
    @GetMapping("/contatos")
    public List<Contato> getContatos() {
        return contatoRepo.findAll();
    }
    
    // Estatísticas
    @GetMapping("/stats")
    public Map<String, Long> getEstatisticas() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("cursos", cursoRepo.countAtivos());
        stats.put("alunos", usuarioRepo.countAlunos());
        stats.put("professores", professorRepo.countAprovados());
        return stats;
    }
    
    // Health Check
    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "UP");
        status.put("timestamp", LocalDateTime.now().toString());
        return status;
    }
}