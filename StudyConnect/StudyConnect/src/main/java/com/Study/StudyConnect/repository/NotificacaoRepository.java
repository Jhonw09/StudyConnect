package com.Study.StudyConnect.repository;

import com.Study.StudyConnect.model.Notificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {
    List<Notificacao> findByUsuarioIdOrderByDataCriacaoDesc(Long usuarioId);
    List<Notificacao> findByUsuarioIdAndLidaFalseOrderByDataCriacaoDesc(Long usuarioId);
    long countByUsuarioIdAndLidaFalse(Long usuarioId);
}