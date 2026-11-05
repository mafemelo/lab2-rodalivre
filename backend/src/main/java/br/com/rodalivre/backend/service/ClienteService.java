package br.com.rodalivre.backend.service;

import br.com.rodalivre.backend.dto.*;
import br.com.rodalivre.backend.model.*;
import br.com.rodalivre.backend.repository.ClienteRepository;
import br.com.rodalivre.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepo;
    private final UsuarioRepository usuarioRepo;
    private final PasswordEncoder encoder;

    @Transactional
    public ClienteResponse cadastrar(CadastroRequest r) {
        if (usuarioRepo.existsByLogin(r.login()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Login já em uso");
        if (clienteRepo.existsByCpf(r.cpf()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF já cadastrado");

        Usuario u = new Usuario();
        u.setLogin(r.login());
        u.setSenhaHash(encoder.encode(r.senha()));
        u.setPapel(Papel.CLIENTE);

        Cliente c = new Cliente();
        c.setUsuario(u);
        preencher(c, r.rg(), r.cpf(), r.nome(), r.endereco(), r.profissao(), r.rendimentos());
        return ClienteResponse.de(clienteRepo.save(c));
    }

    @Transactional(readOnly = true)
    public ClienteResponse buscar(String login) {
        return ClienteResponse.de(obter(login));
    }

    @Transactional(readOnly = true)
    public List<ClienteResponse> listar() {
        return clienteRepo.findAll().stream().map(ClienteResponse::de).toList();
    }

    @Transactional
    public ClienteResponse atualizar(String login, ClienteRequest r) {
        Cliente c = obter(login);
        if (!c.getCpf().equals(r.cpf()) && clienteRepo.existsByCpf(r.cpf()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF já cadastrado");
        preencher(c, r.rg(), r.cpf(), r.nome(), r.endereco(), r.profissao(), r.rendimentos());
        return ClienteResponse.de(clienteRepo.save(c));
    }

    @Transactional
    public void excluir(String login) {
        clienteRepo.delete(obter(login));
    }

    private Cliente obter(String login) {
        return clienteRepo.findByUsuarioLogin(login)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }

    private void preencher(Cliente c, String rg, String cpf, String nome, String endereco,
                           String profissao, List<RendimentoDto> rendimentos) {
        c.setRg(rg);
        c.setCpf(cpf);
        c.setNome(nome);
        c.setEndereco(endereco);
        c.setProfissao(profissao);
        c.getRendimentos().clear();
        if (rendimentos != null) {
            for (RendimentoDto d : rendimentos) {
                Rendimento r = new Rendimento();
                r.setCliente(c);
                r.setEntidadeEmpregadora(d.entidadeEmpregadora());
                r.setValor(d.valor());
                c.getRendimentos().add(r);
            }
        }
    }
}