# ManagementClient-Web

## Funcionalidades Principais

### Cadastro de Clientes

- Interface de usuário para criar novos clientes, com formulários dinâmicos para Pessoa Física (PF) e Pessoa Jurídica (PJ).
- Validação de campos obrigatórios realizada no frontend para garantir dados consistentes antes de enviar para o backend.

### Visualização e Edição de Clientes

- Capacidade de visualizar detalhes de clientes existentes.
- Lista completa de clientes cadastrados, exibindo informações básicas como nome, CPF/CNPJ, endereço e telefone.
- Edição dos dados dos clientes, com formulários que se adaptam dinamicamente com base no tipo de pessoa (PF ou PJ).

### Exclusão de Clientes

- Funcionalidade para remover clientes do sistema, com confirmação para evitar exclusões acidentais.

### Integração com a API Backend

- O frontend Vue.js se integra completamente com uma API desenvolvida no backend.
- Utiliza-se requisições HTTP (GET, POST, PUT, DELETE) para realizar operações CRUD (Create, Read, Update, Delete) nos dados dos clientes.
- As informações são recuperadas e enviadas para o backend de forma assíncrona, garantindo uma experiência de usuário fluida e responsiva.

## Tecnologias Utilizadas

- **Vue.js:** Framework JavaScript progressivo para construção de interfaces de usuário.
- **Vue Router:** Gerenciamento de rotas para navegação dentro da aplicação.
- **Axios:** Cliente HTTP baseado em Promises para fazer requisições para a API backend de forma assíncrona.
- **VueTheMask:** Plugin Vue.js para máscaras de campos, facilitando a formatação de CPF e CNPJ.

## Como Iniciar o Projeto

1. **Instalação das Dependências:**
   - Certifique-se de ter o Node.js e o npm (ou yarn) instalados localmente.
   - Instale as dependências do projeto:

     ```bash
     npm install
     # ou
     yarn install
     ```

2. **Execução do Projeto:**
   - Inicie o servidor de desenvolvimento:

     ```bash
     npm run dev
     # ou
     yarn dev
     ```

   - Acesse a aplicação no navegador pelo endereço `http://localhost:5173` (ou outra porta configurada).

