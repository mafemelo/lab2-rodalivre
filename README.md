# Roda Livre: Sistema de Aluguel de Carros

Laboratório 02 de Desenvolvimento e Integração de Aplicações Web (DIAW), PUC Minas, Engenharia de Software.
Trabalho individual. Autor(a): [SEU NOME]

## Descrição

Sistema web para gestão de aluguéis de automóveis. O cliente se cadastra, faz login, gerencia seus dados e rendimentos (máximo de 3) e cria pedidos de aluguel, acompanhando o status de cada um.

## Tecnologias

- Java 25
- Spring Boot 4.0.6 (arquitetura MVC)
- Apache Maven (Maven Wrapper)
- React + Vite (front-end)
- Supabase (PostgreSQL)
- Spring Security com BCrypt

## Arquitetura

Back-end em pacotes `model`, `repository`, `service`, `controller`, `dto`, `security` e `config`.
O front-end React consome a API REST do back-end, e o back-end acessa o banco por JDBC.

## Autenticação

Login obrigatório (usuário e senha) com HTTP Basic e senhas protegidas com BCrypt, sem sessão (stateless).
Evolução prevista: JWT.

## Como executar

### Banco de dados

Crie um projeto no Supabase e defina as variáveis de ambiente (PowerShell):

```powershell
$env:DB_URL="jdbc:postgresql://<host>:5432/postgres"
$env:DB_USER="<usuario>"
$env:DB_PASSWORD="<senha>"
```

### Back-end

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Disponível em http://localhost:8080. As tabelas são criadas automaticamente na primeira execução, junto com 3 automóveis de exemplo.

### Front-end

```powershell
cd frontend
npm install
npm run dev
```

Disponível em http://localhost:5173.

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| POST | /api/auth/register | Cadastro de cliente (público) |
| GET | /api/auth/me | Valida o login |
| GET | /api/clientes/me | Consulta os dados do cliente logado |
| PUT | /api/clientes/me | Atualiza os dados do cliente |
| DELETE | /api/clientes/me | Exclui o cliente |
| GET | /api/automoveis | Lista os automóveis |
| POST | /api/pedidos | Cria pedido de aluguel (status EM_ANALISE) |
| GET | /api/pedidos | Lista os pedidos do cliente |
| PUT | /api/pedidos/{id}/cancelar | Cancela pedido em análise |

## Modelagem (UML)

- [Casos de Uso](docs/01-casos-de-uso.md)
- [Diagrama de Classes](docs/02-diagrama-de-classes.md)
- [Diagrama de Pacotes](docs/03-diagrama-de-pacotes.md)

## Status do projeto

Implementado:
- Cadastro e login
- CRUD de cliente com até 3 rendimentos
- Pedido de aluguel com status (criar, listar, cancelar)
