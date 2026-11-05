package br.com.rodalivre.backend.controller;

import br.com.rodalivre.backend.dto.CadastroRequest;
import br.com.rodalivre.backend.dto.ClienteResponse;
import br.com.rodalivre.backend.service.ClienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final ClienteService service;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ClienteResponse registrar(@Valid @RequestBody CadastroRequest req) {
        return service.cadastrar(req);
    }

    /** Usado pelo front para validar o login: 200 se as credenciais estão certas, 401 se não. */
    @GetMapping("/me")
    public Map<String, Object> me(Authentication auth) {
        return Map.of("login", auth.getName(),
                "papel", auth.getAuthorities().iterator().next().getAuthority());
    }
}