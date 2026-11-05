package br.com.rodalivre.backend.service;

import br.com.rodalivre.backend.dto.PedidoResponse;
import br.com.rodalivre.backend.model.*;
import br.com.rodalivre.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoAluguelRepository pedidoRepo;
    private final ClienteRepository clienteRepo;
    private final AutomovelRepository automovelRepo;

    @Transactional
    public PedidoResponse criar(String login, Long automovelId) {
        Cliente c = clienteRepo.findByUsuarioLogin(login)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
        Automovel a = automovelRepo.findById(automovelId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Automóvel não encontrado"));
        PedidoAluguel p = new PedidoAluguel();
        p.setCliente(c);
        p.setAutomovel(a);
        p.setDataPedido(LocalDate.now());
        p.setStatus(StatusPedido.EM_ANALISE);
        return PedidoResponse.de(pedidoRepo.save(p));
    }

    @Transactional(readOnly = true)
    public List<PedidoResponse> listar(String login) {
        return pedidoRepo.findByClienteUsuarioLoginOrderByIdDesc(login).stream()
                .map(PedidoResponse::de).toList();
    }

    @Transactional
    public PedidoResponse cancelar(String login, Long id) {
        PedidoAluguel p = pedidoRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));
        if (!p.getCliente().getUsuario().getLogin().equals(login))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Pedido de outro cliente");
        if (p.getStatus() != StatusPedido.EM_ANALISE)
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Só é possível cancelar pedido em análise");
        p.setStatus(StatusPedido.CANCELADO);
        return PedidoResponse.de(pedidoRepo.save(p));
    }
}