# 🚀 Projeto de API RESTful com Node.js, Express e MongoDB

Este projeto é uma API RESTful completa desenvolvida com Node.js, utilizando o framework Express para roteamento e o Mongoose para interação com um banco de dados MongoDB Atlas. A API permite gerenciar informações de **Usuários** e **Produtos** através das operações CRUD (Create, Read, Update, Delete).

É um projeto ideal para demonstrar habilidades em desenvolvimento backend com JavaScript, persistência de dados e construção de APIs seguindo princípios REST.

## ✨ Funcionalidades

A API oferece os seguintes endpoints para gerenciamento de dados:

### Usuários (`/api/users`)

* **`POST /api/users`**: Cria um novo usuário.
* **`GET /api/users`**: Retorna todos os usuários cadastrados.
* **`GET /api/users/:id`**: Retorna um usuário específico pelo ID.
* **`PUT /api/users/:id`**: Atualiza as informações de um usuário existente.
* **`DELETE /api/users/:id`**: Exclui um usuário do banco de dados.

### Produtos (`/api/products`)

* **`POST /api/products`**: Cria um novo produto.
* **`GET /api/products`**: Retorna todos os produtos cadastrados.
* **`GET /api/products/:id`**: Retorna um produto específico pelo ID.
* **`PUT /api/products/:id`**: Atualiza as informações de um produto existente.
* **`DELETE /api/products/:id`**: Exclui um produto do banco de dados.

## 🛠️ Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript.
* **Express**: Framework web para Node.js, facilitando a construção de APIs.
* **Mongoose**: ODM (Object Data Modeling) para Node.js, para interação com MongoDB.
* **MongoDB Atlas**: Serviço de banco de dados NoSQL baseado em nuvem.
* **Dotenv**: Para gerenciar variáveis de ambiente de forma segura.
* **Thunder Client (ou Postman/Insomnia)**: Ferramenta utilizada para testar os endpoints da API.

## ⚙️ Instalação e Configuração

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

* [Node.js](https://nodejs.org/en/download/) (inclui npm)
* Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (para criar um cluster e obter a string de conexão).

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```
    (Lembre-se de criar o repositório no GitHub primeiro e adaptar o link!)

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configuração das Variáveis de Ambiente (`.env`):**
    Na raiz do projeto, crie um arquivo chamado `.env` e adicione as seguintes variáveis. Substitua os valores entre `< >` pelas suas credenciais do MongoDB Atlas e pela porta desejada.

    ```dotenv
    # .env
    MONGO_URI=mongodb+srv://<seu-usuario-atlas>:<sua-senha-atlas>@cluster0.abcde.mongodb.net/seuappdb?retryWrites=true&w=majority
    PORT=3000
    ```
    * `MONGO_URI`: String de conexão do seu cluster MongoDB Atlas. **Certifique-se de incluir o nome do seu banco de dados (`/seuappdb`) antes de `?retryWrites...`**.
    * `PORT`: Porta em que o servidor Node.js será executado.

    **Importante:** Este arquivo `.env` já está no `.gitignore` e **não deve ser enviado** para o controle de versão.

4.  **Inicie o Servidor:**
    ```bash
    node server.js
    ```
    O servidor estará rodando em `http://localhost:3000` (ou na porta que você definiu). Você verá mensagens no console confirmando a conexão com o MongoDB.

## 🚀 Como Usar a API (Exemplos com Thunder Client)

Com o servidor rodando, você pode usar o [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) (ou Postman/Insomnia) para testar os endpoints.

Certifique-se de definir o `Content-Type: application/json` nos headers para requisições `POST` e `PUT`.

---

### **Exemplos para Usuários:**

#### 1. Criar Usuário (POST)
`POST http://localhost:3000/api/users`
**Body (JSON):**
```json
{
    "name": "Fulano de Tal",
    "email": "fulano.detal@example.com",
    "age": 28
}