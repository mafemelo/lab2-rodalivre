package br.com.rodalivre.backend.dto;

import jakarta.validation.constraints.NotNull;

public record PedidoRequest(@NotNull Long automovelId) {}