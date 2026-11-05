package br.com.rodalivre.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "rendimentos")
@Getter @Setter @NoArgsConstructor
public class Rendimento {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @Column(nullable = false)
    private String entidadeEmpregadora;

    @Column(nullable = false, precision = 14, scale = 2)
    private BigDecimal valor;
}