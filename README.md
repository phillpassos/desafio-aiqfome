# Aiqfome — Serviço de Favoritos

Microserviço em Express + TypeScript para gerenciar clientes e seus produtos favoritos.

- Backend minimalista usando Express
- Banco de dados Postgresql
- Acesso a banco via Prisma (db-first)
- Documentação gerada com swagger-autogen e servida com swagger-ui-express

---

## Sobre

Este microserviço expõe endpoints para:

- CRUD de clientes (nome, email)
- Gerenciar favoritos de clientes (associação a produtos externos)
- Endpoints de autenticação (login) para gerar JWTs (exemplificativo)

O serviço foi pensado para ficar atrás de um gateway (NGINX, API Gateway), por isso não foram adicionados cabeçalhos especiais de segurança na documentação.

---

## Modelos de dados (resumo)

- **clientes**
  - id: SERIAL (PK, autoincrement)
  - nome: String
  - email: String (unique)

- **favoritos**
  - id: SERIAL (PK, autoincrement)
  - id_cliente: Int (FK -> clientes.id)
  - id_produto_externo: Int

Regras importantes:

- `email` é único entre clientes.
- Um produto não pode estar duplicado na lista de favoritos do mesmo cliente (unique on [id_cliente, id_produto_externo]).
- Favoritos retornam dados do produto (via API externa) com: id, título, imagem, preço e rating.

---

## Endpoints (resumo)

Base path: `/api` (o `app` monta as rotas em `/api`). Consulte `src/modules/*/*.routes.ts` para rotas exatas.

### Clientes

- `POST /api/cliente` — criar cliente
  - Body: `{ nome, email }` (nome e email obrigatórios)
  - Resposta: 201 com cliente criado

- `GET /api/cliente` — listar clientes

- `PUT /api/cliente/:id` — atualizar cliente

- `DELETE /api/cliente/:id` — remover cliente

### Favoritos

- `POST /api/favoritos/:idCliente` — adicionar favorito (idProdutoExterno no body)

- `GET /api/favoritos/:idCliente` — listar favoritos de um cliente (retorna um array)

- `DELETE /api/favoritos/:id` — remover favorito por id

### Auth (exemplos)

- `POST /api/auth` — login; retorna `{ token: '...' }`

---

## Autenticação e autorização

- O projeto inclui exemplos de endpoints para emissão de JWTs.
- Em produção recomenda-se que a autenticação seja verificada por um componente externo (gateway ou cache como Redis).
O serviço atua como recurso protegido. Por conta disso, não entrei em muitos detalhes quanto a autenticação.

---

## Integração externa — Produtos

Utilizada a API pública `https://fakestoreapi.com` para validar/obter detalhes de produtos.

Endpoints:

- `GET https://fakestoreapi.com/products` — listar todos
- `GET https://fakestoreapi.com/products/{id}` — buscar por id

---

## Rodando localmente

1. Instale dependências:

```cmd
npm install
```

2. Gere o Prisma Client (essencial):

  - Restaure o arquivo de dump (postgresql/aiqfome-dump.sql) ou rode os comandos SQL do arquivo aiqfome-favoritos.sql no banco de dados e schema de sua escolha
  - Altere no arquivo .env a variável DATABASE_URL, informando o domínio, banco e schema do banco postgres a ser utilizado
```cmd
npm install @prisma/client
npx prisma generate
```

3. Em desenvolvimento:

```cmd
npm run dev
```

4. Build/Start:

```cmd
npm run build
npm start
```

---

## Documentação (Swagger)

- Gerador: `src/swagger.js` (usa `swagger-autogen`)
- Saída: `swagger.json` (gerado pelo script)
- UI: `swagger-ui-express` (montada em `/swagger`)

Gerar a documentação:

```cmd
node src/swagger.js
```

---

## Docker / Make

O repositório inclui um `Makefile` com target `local` para build e run em Docker.

Exemplo manual:

```cmd
docker build -t aiqfome-favoritos-backend:latest .
docker run -d --name aiqfome-favoritos-backend -p 3000:3000 aiqfome-favoritos-backend:latest
```

Use `make local` para executar a sequência definida no `Makefile`.
