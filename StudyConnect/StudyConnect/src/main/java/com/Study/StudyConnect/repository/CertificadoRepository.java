package com.Study.StudyConnect.repository;

import com.Study.StudyConnect.model.Certificado;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CertificadoRepository extends JpaRepository<Certificado, Long> {
    List<Certificado> findByUsuarioId(Long usuarioId);
    Optional<Certificado> findByCodigoCertificado(String codigo);
    boolean existsByUsuarioIdAndCursoId(Long usuarioId, Long cursoId);
}