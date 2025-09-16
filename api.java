// =============================================
// StudyConnect+ - API Spring Boot Simples
// =============================================

// pom.xml
/*
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>
    <groupId>com.studyconnect</groupId>
    <artifactId>api</artifactId>
    <version>1.0.0</version>
    
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>com.microsoft.sqlserver</groupId>
            <artifactId>mssql-jdbc</artifactId>
        </dependency>
    </dependencies>
</project>
*/

// application.yml
/*
server:
  port: 8080
spring:
  datasource:
    url: jdbc:sqlserver://localhost:1433;databaseName=StudyConnect
    username: sa
    password: 123456
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true
*/

// ========== MAIN APPLICATION ==========
package com.studyconnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StudyConnectApp {
    public static void main(String[] args) {
        SpringApplication.run(StudyConnectApp.class, args);
    }
}

// ========== MODELS ==========

// Usuario.java
package com.studyconnect.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
public class Usuario {
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

// Curso.java
package com.studyconnect.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "cursos")
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    
    @Column(name = "total_aulas")
    private Integer totalAulas;
    
    private BigDecimal avaliacao;
    
    @Column(name = "total_alunos")
    private Integer totalAlunos;
    
    private Boolean popular;
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
    
    public String getNivel() { return nivel; }
    public void setNivel(String nivel) { this.nivel = nivel; }
    
    public Integer getDuracaoHoras() { return duracaoHoras; }
    public void setDuracaoHoras(Integer duracaoHoras) { this.duracaoHoras = duracaoHoras; }
    
    public Integer getTotalAulas() { return totalAulas; }
    public void setTotalAulas(Integer totalAulas) { this.totalAulas = totalAulas; }
    
    public BigDecimal getAvaliacao() { return avaliacao; }
    public void setAvaliacao(BigDecimal avaliacao) { this.avaliacao = avaliacao; }
    
    public Integer getTotalAlunos() { return totalAlunos; }
    public void setTotalAlunos(Integer totalAlunos) { this.totalAlunos = totalAlunos; }
    
    public Boolean getPopular() { return popular; }
    public void setPopular(Boolean popular) { this.popular = popular; }
    
    public String getImagem() { return imagem; }
    public void setImagem(String imagem) { this.imagem = imagem; }
    
    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
    
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
}

// Professor.java
package com.studyconnect.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "professores")
public class Professor {
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
    
    public Boolean getAprovado() { return aprovado; }
    public void setAprovado(Boolean aprovado) { this.aprovado = aprovado; }
}

// Contato.java
package com.studyconnect.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contatos")
public class Contato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    private String email;
    private String assunto;
    private String mensagem;
    private Boolean respondido;
    
    @Column(name = "criado_em")
    private LocalDateTime criadoEm;
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getAssunto() { return assunto; }
    public void setAssunto(String assunto) { this.assunto = assunto; }
    
    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }
    
    public Boolean getRespondido() { return respondido; }
    public void setRespondido(Boolean respondido) { this.respondido = respondido; }
    
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
}

// ========== REPOSITORIES ==========

// CursoRepository.java
package com.studyconnect.repository;

import com.studyconnect.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface CursoRepository extends JpaRepository<Curso, Long> {
    List<Curso> findByAtivoTrue();
    List<Curso> findByCategoriaIdAndAtivoTrue(Long categoriaId);
    List<Curso> findByPopularTrueAndAtivoTrue();
    
    @Query("SELECT COUNT(c) FROM Curso c WHERE c.ativo = true")
    long countAtivos();
}

// ProfessorRepository.java
package com.studyconnect.repository;

import com.studyconnect.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    List<Professor> findByAprovadoTrue();
}

// ContatoRepository.java
package com.studyconnect.repository;

import com.studyconnect.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Long> {
}

// UsuarioRepository.java
package com.studyconnect.repository;

import com.studyconnect.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
    
    @Query("SELECT COUNT(u) FROM Usuario u WHERE u.tipo = 'ALUNO' AND u.ativo = true")
    long countAlunos();
    
    @Query("SELECT COUNT(u) FROM Usuario u WHERE u.tipo = 'PROFESSOR' AND u.ativo = true")
    long countProfessores();
}

// ========== CONTROLLERS ==========

// CursoController.java
package com.studyconnect.controller;

import com.studyconnect.model.Curso;
import com.studyconnect.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cursos")
@CrossOrigin(origins = "*")
public class CursoController {
    
    @Autowired
    private CursoRepository cursoRepository;
    
    @GetMapping
    public List<Curso> listarTodos() {
        return cursoRepository.findByAtivoTrue();
    }
    
    @GetMapping("/{id}")
    public Curso buscarPorId(@PathVariable Long id) {
        return cursoRepository.findById(id).orElse(null);
    }
    
    @GetMapping("/categoria/{categoriaId}")
    public List<Curso> listarPorCategoria(@PathVariable Long categoriaId) {
        return cursoRepository.findByCategoriaIdAndAtivoTrue(categoriaId);
    }
    
    @GetMapping("/populares")
    public List<Curso> listarPopulares() {
        return cursoRepository.findByPopularTrueAndAtivoTrue();
    }
    
    @GetMapping("/count")
    public long contarCursos() {
        return cursoRepository.countAtivos();
    }
}

// ProfessorController.java
package com.studyconnect.controller;

import com.studyconnect.model.Professor;
import com.studyconnect.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/professores")
@CrossOrigin(origins = "*")
public class ProfessorController {
    
    @Autowired
    private ProfessorRepository professorRepository;
    
    @GetMapping
    public List<Professor> listarTodos() {
        return professorRepository.findByAprovadoTrue();
    }
    
    @GetMapping("/{id}")
    public Professor buscarPorId(@PathVariable Long id) {
        return professorRepository.findById(id).orElse(null);
    }
}

// ContatoController.java
package com.studyconnect.controller;

import com.studyconnect.model.Contato;
import com.studyconnect.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/contatos")
@CrossOrigin(origins = "*")
public class ContatoController {
    
    @Autowired
    private ContatoRepository contatoRepository;
    
    @PostMapping
    public Contato enviarContato(@RequestBody Contato contato) {
        contato.setCriadoEm(LocalDateTime.now());
        contato.setRespondido(false);
        return contatoRepository.save(contato);
    }
}

// EstatisticasController.java
package com.studyconnect.controller;

import com.studyconnect.repository.CursoRepository;
import com.studyconnect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*")
public class EstatisticasController {
    
    @Autowired
    private CursoRepository cursoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @GetMapping
    public Map<String, Long> obterEstatisticas() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("cursos", cursoRepository.countAtivos());
        stats.put("alunos", usuarioRepository.countAlunos());
        stats.put("professores", usuarioRepository.countProfessores());
        return stats;
    }
}