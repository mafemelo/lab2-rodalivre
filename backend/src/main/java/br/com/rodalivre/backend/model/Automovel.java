package br.com.rodalivre.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "automoveis")
@Getter @Setter @NoArgsConstructor
public class Automovel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true) private String matricula;
    @Column(nullable = false) private int ano;
    @Column(nullable = false) private String marca;
    @Column(nullable = false) private String modelo;
    @Column(nullable = false, unique = true) private String placa;
}