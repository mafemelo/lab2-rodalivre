package br.com.rodalivre.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;

import java.util.List;

public record CadastroRequest(
        @NotBlank @Size(min = 3, max = 50) String login,
        @NotBlank @Size(min = 6, max = 72) String senha,
        @NotBlank @Pattern(regexp = "[0-9A-Za-z.\\-]{5,14}", message = "RG deve ter de 5 a 14 caracteres") String rg,
        @NotBlank @Pattern(regexp = "\\d{11}", message = "CPF deve ter 11 dígitos") String cpf,
        @NotBlank String nome,
        @NotBlank String endereco,
        @NotBlank String profissao,
        @Valid @Size(max = 3, message = "Máximo de 3 rendimentos") List<RendimentoDto> rendimentos) {}