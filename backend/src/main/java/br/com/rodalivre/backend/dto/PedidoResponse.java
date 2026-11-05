package br.com.rodalivre.backend.dto;

import br.com.rodalivre.backend.model.PedidoAluguel;

import java.time.LocalDate;

public record PedidoResponse(Long id, Long automovelId, String automovel, String placa,
                             LocalDate dataPedido, String status) {
    public static PedidoResponse de(PedidoAluguel p) {
        var a = p.getAutomovel();
        return new PedidoResponse(p.getId(), a.getId(),
                a.getMarca() + " " + a.getModelo() + " " + a.getAno(),
                a.getPlaca(), p.getDataPedido(), p.getStatus().name());
    }
}