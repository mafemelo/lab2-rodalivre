package br.com.rodalivre.backend.controller;

import br.com.rodalivre.backend.dto.PedidoRequest;
import br.com.rodalivre.backend.dto.PedidoResponse;
import br.com.rodalivre.backend.model.Automovel;
import br.com.rodalivre.backend.repository.AutomovelRepository;
import br.com.rodalivre.backend.service.PedidoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoService service;
    private final AutomovelRepository automovelRepo;

    @GetMapping("/automoveis")
    public List<Automovel> automoveis() {
        return automovelRepo.findAll();
    }

    @PostMapping("/pedidos")
    @ResponseStatus(HttpStatus.CREATED)
    public PedidoResponse criar(Authentication auth, @Valid @RequestBody PedidoRequest req) {
        return service.criar(auth.getName(), req.automovelId());
    }

    @GetMapping("/pedidos")
    public List<PedidoResponse> listar(Authentication auth) {
        return service.listar(auth.getName());
    }

    @PutMapping("/pedidos/{id}/cancelar")
    public PedidoResponse cancelar(Authentication auth, @PathVariable Long id) {
        return service.cancelar(auth.getName(), id);
    }
}