package com.Study.StudyConnect.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "matriculas")
public class Matricula {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @ManyToOne
    @JoinColumn(name = "curso_id", nullable = false)
    private Curso curso;
    
    @Column(name = "data_matricula")
    private LocalDateTime dataMatricula = LocalDateTime.now();
    
    @Column(precision = 5, scale = 2)
    private BigDecimal progresso = BigDecimal.ZERO;
    
    private Boolean concluido = false;
    
    @Column(name = "data_conclusao")
    private LocalDateTime dataConclusao;
    
    @Column(precision = 3, scale = 2)
    private BigDecimal avaliacao;
    
    public Matricula() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    
    public Curso getCurso() { return curso; }
    public void setCurso(Curso curso) { this.curso = curso; }
    
    public LocalDateTime getDataMatricula() { return dataMatricula; }
    public void setDataMatricula(LocalDateTime dataMatricula) { this.dataMatricula = dataMatricula; }
    
    public BigDecimal getProgresso() { return progresso; }
    public void setProgresso(BigDecimal progresso) { this.progresso = progresso; }
    
    public Boolean getConcluido() { return concluido; }
    public void setConcluido(Boolean concluido) { this.concluido = concluido; }
    
    public LocalDateTime getDataConclusao() { return dataConclusao; }
    public void setDataConclusao(LocalDateTime dataConclusao) { this.dataConclusao = dataConclusao; }
    
    public BigDecimal getAvaliacao() { return avaliacao; }
    public void setAvaliacao(BigDecimal avaliacao) { this.avaliacao = avaliacao; }
}