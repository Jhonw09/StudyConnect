package com.studyconnect.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "professores")
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
    
    @Column(length = 100)
    private String especialidade;
    
    @Column(columnDefinition = "NTEXT")
    private String biografia;
    
    @Column(precision = 3, scale = 2)
    private BigDecimal avaliacao = BigDecimal.ZERO;
    
    @Column(name = "total_alunos")
    private Integer totalAlunos = 0;
    
    @Column(name = "status_online")
    private Boolean statusOnline = false;
    
    @Column(length = 200)
    private String linkedin;
    
    @Column(length = 200)
    private String github;
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    
    public String getEspecialidade() { return especialidade; }
    public void setEspecialidade(String especialidade) { this.especialidade = especialidade; }
    
    public String getBiografia() { return biografia; }
    public void setBiografia(String biografia) { this.biografia = biografia; }
    
    public BigDecimal getAvaliacao() { return avaliacao; }
    public void setAvaliacao(BigDecimal avaliacao) { this.avaliacao = avaliacao; }
    
    public Integer getTotalAlunos() { return totalAlunos; }
    public void setTotalAlunos(Integer totalAlunos) { this.totalAlunos = totalAlunos; }
    
    public Boolean getStatusOnline() { return statusOnline; }
    public void setStatusOnline(Boolean statusOnline) { this.statusOnline = statusOnline; }
    
    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }
    
    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }
}