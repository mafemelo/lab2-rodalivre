package br.com.rodalivre.backend.repository;

import br.com.rodalivre.backend.model.Automovel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AutomovelRepository extends JpaRepository<Automovel, Long> {}