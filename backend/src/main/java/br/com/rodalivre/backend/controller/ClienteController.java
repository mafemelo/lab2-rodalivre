package br.com.rodalivre.backend.controller;

import br.com.rodalivre.backend.dto.ClienteRequest;
import br.com.rodalivre.backend.dto.ClienteResponse;
import br.com.rodalivre.backend.service.ClienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService service;

    @GetMapping("/me")
    public ClienteResponse meusDados(Authentication auth) {
        return service.buscar(auth.getName());
    }

    @PutMapping("/me")
    public ClienteResponse atualizar(Authentication auth, @Valid @RequestBody ClienteRequest req) {
        return service.atualizar(auth.getName(), req);
    }

    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(Authentication auth) {
        service.excluir(auth.getName());
    }

    /** Somente agentes. */
    @GetMapping
    public List<ClienteResponse> listar() {
        return service.listar();
    }
}