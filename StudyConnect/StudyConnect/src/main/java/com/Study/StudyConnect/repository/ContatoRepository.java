package com.Study.StudyConnect.repository;

import com.Study.StudyConnect.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Long> {
}