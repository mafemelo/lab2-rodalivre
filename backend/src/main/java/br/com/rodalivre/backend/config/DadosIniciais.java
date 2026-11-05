package br.com.rodalivre.backend.config;

import br.com.rodalivre.backend.model.Automovel;
import br.com.rodalivre.backend.repository.AutomovelRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DadosIniciais {

    @Bean
    CommandLineRunner carregarAutomoveis(AutomovelRepository repo) {
        return args -> {
            if (repo.count() > 0) return;
            repo.save(carro("11111111111", 2023, "Fiat", "Argo", "ABC1D23"));
            repo.save(carro("22222222222", 2022, "Chevrolet", "Onix", "DEF4G56"));
            repo.save(carro("33333333333", 2024, "Volkswagen", "Polo", "HIJ7K89"));
        };
    }

    private Automovel carro(String matricula, int ano, String marca, String modelo, String placa) {
        Automovel a = new Automovel();
        a.setMatricula(matricula);
        a.setAno(ano);
        a.setMarca(marca);
        a.setModelo(modelo);
        a.setPlaca(placa);
        return a;
    }
}