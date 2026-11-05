package br.com.rodalivre.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CadastroRequest(
        @NotBlank @Size(min = 3, max = 50) String login,
        @NotBlank @Size(min = 6, max = 72) String senha,
        @NotBlank String rg,
        @NotBlank String cpf,
        @NotBlank String nome,
        @NotBlank String endereco,
        @NotBlank String profissao,
        @Valid @Size(max = 3, message = "Máximo de 3 rendimentos") List<RendimentoDto> rendimentos) {}