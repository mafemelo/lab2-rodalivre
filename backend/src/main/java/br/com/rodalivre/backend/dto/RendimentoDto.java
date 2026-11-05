package br.com.rodalivre.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record RendimentoDto(
        @NotBlank String entidadeEmpregadora,
        @NotNull @PositiveOrZero BigDecimal valor) {}