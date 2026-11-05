package br.com.rodalivre.backend.repository;

import br.com.rodalivre.backend.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByUsuarioLogin(String login);
    boolean existsByCpf(String cpf);
}