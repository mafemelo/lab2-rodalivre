package br.com.rodalivre.backend.repository;

import br.com.rodalivre.backend.model.PedidoAluguel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoAluguelRepository extends JpaRepository<PedidoAluguel, Long> {
    List<PedidoAluguel> findByClienteUsuarioLoginOrderByIdDesc(String login);
}