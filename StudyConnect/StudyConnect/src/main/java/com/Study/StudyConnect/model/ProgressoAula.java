package com.Study.StudyConnect.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "progresso_aulas")
public class ProgressoAula {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @ManyToOne
    @JoinColumn(name = "aula_id", nullable = false)
    private Aula aula;
    
    private Boolean assistido = false;
    
    @Column(name = "tempo_assistido")
    private Integer tempoAssistido = 0;
    
    @Column(name = "data_inicio")
    private LocalDateTime dataInicio;
    
    @Column(name = "data_conclusao")
    private LocalDateTime dataConclusao;
    
    public ProgressoAula() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    
    public Aula getAula() { return aula; }
    public void setAula(Aula aula) { this.aula = aula; }
    
    public Boolean getAssistido() { return assistido; }
    public void setAssistido(Boolean assistido) { this.assistido = assistido; }
    
    public Integer getTempoAssistido() { return tempoAssistido; }
    public void setTempoAssistido(Integer tempoAssistido) { this.tempoAssistido = tempoAssistido; }
    
    public LocalDateTime getDataInicio() { return dataInicio; }
    public void setDataInicio(LocalDateTime dataInicio) { this.dataInicio = dataInicio; }
    
    public LocalDateTime getDataConclusao() { return dataConclusao; }
    public void setDataConclusao(LocalDateTime dataConclusao) { this.dataConclusao = dataConclusao; }
}