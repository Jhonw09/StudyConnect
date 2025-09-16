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
    
    @Column(nullable = false, length = 100)
    private String titulo;
    
    @Column(columnDefinition = "NTEXT")
    private String descricao;
    
    @ManyToOne
    @JoinColumn(name = "professor_id")
    private Professor professor;
    
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal preco;
    
    @Enumerated(EnumType.STRING)
    private Nivel nivel;
    
    @Column(name = "duracao_horas")
    private Integer duracaoHoras;
    
    @Column(precision = 3, scale = 2)
    private BigDecimal avaliacao = BigDecimal.ZERO;
    
    @Column(name = "total_alunos")
    private Integer totalAlunos = 0;
    
    private Boolean popular = false;
    
    @Column(name = "imagem_url", length = 500)
    private String imagemUrl;
    
    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao = LocalDateTime.now();
    
    private Boolean ativo = true;
    
    public enum Nivel {
        iniciante, intermediario, avancado
    }
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    
    public Professor getProfessor() { return professor; }
    public void setProfessor(Professor professor) { this.professor = professor; }
    
    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }
    
    public BigDecimal getPreco() { return preco; }
    public void setPreco(BigDecimal preco) { this.preco = preco; }
    
    public Nivel getNivel() { return nivel; }
    public void setNivel(Nivel nivel) { this.nivel = nivel; }
    
    public Integer getDuracaoHoras() { return duracaoHoras; }
    public void setDuracaoHoras(Integer duracaoHoras) { this.duracaoHoras = duracaoHoras; }
    
    public BigDecimal getAvaliacao() { return avaliacao; }
    public void setAvaliacao(BigDecimal avaliacao) { this.avaliacao = avaliacao; }
    
    public Integer getTotalAlunos() { return totalAlunos; }
    public void setTotalAlunos(Integer totalAlunos) { this.totalAlunos = totalAlunos; }
    
    public Boolean getPopular() { return popular; }
    public void setPopular(Boolean popular) { this.popular = popular; }
    
    public String getImagemUrl() { return imagemUrl; }
    public void setImagemUrl(String imagemUrl) { this.imagemUrl = imagemUrl; }
    
    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }
    
    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
}