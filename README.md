# Aiqfome — Serviço de Favoritos

Microserviço em Express + TypeScript para gerenciar clientes e seus produtos favoritos.

- Backend minimalista usando Express (Nodejs 22.15.0)
- Banco de dados Postgresql
- Acesso a banco via Prisma (db-first)
- Documentação gerada com swagger-autogen e servida com swagger-ui-express
- Testes unitários utilizando jest

---
 
<a id="index"></a>
## Índice

- [Sobre](#sobre)
- [Modelos de dados (resumo)](#modelos-de-dados-resumo)
- [Endpoints (resumo)](#endpoints-resumo)
  - [Clientes](#clientes)
  - [Favoritos](#favoritos)
  - [Auth (exemplos)](#auth-exemplos)
- [Autenticação e autorização](#anchor-autenticacao)
- [Integração externa — Produtos](#anchor-integracao)
- [Rodando localmente](#rodando-localmente)
- [Documentação (Swagger)](#anchor-documentacao)
- [Testes unitários (Jest)](#anchor-testes)
- [Docker / Make](#docker--make)

## Sobre

Este microserviço expõe endpoints para:

- CRUD de clientes (nome, email)
- Gerenciar favoritos de clientes (associação a produtos externos)
- Endpoints de autenticação (login) para gerar JWTs (exemplificativo)

O serviço foi pensado para ficar atrás de um gateway (NGINX, API Gateway), por isso não foram adicionados cabeçalhos especiais de segurança na documentação.

---

## Modelos de dados (resumo)

- **clientes**
  - id: SERIAL (PK)
  - nome: String
  - email: String (unique)

- **favoritos**
  - id: SERIAL (PK)
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

- `GET /api/cliente` — listar clientes

- `PUT /api/cliente/:id` — atualizar cliente

- `DELETE /api/cliente/:id` — remover cliente

### Favoritos

<p align="right"><a href="#index">🔝 Voltar ao Índice</a></p>

- `POST /api/favoritos/cliente/:idCliente` — adicionar favorito (idProdutoExterno no body)

- `GET /api/favoritos/cliente/:idCliente` — listar favoritos de um cliente (retorna um array)

- `DELETE /api/favoritos/:id` — remover favorito por id

### Auth (exemplos)

- `POST /api/auth` — login; retorna `{ token: '...' }`

---

<a id="anchor-autenticacao"></a>
## Autenticação e autorização

- O projeto inclui exemplo de endpoint para emissão de JWTs.
- Em produção recomenda-se que a autenticação seja verificada por um componente externo (gateway ou cache como Redis).
O serviço atua como recurso protegido. Por conta disso, não entrei em muitos detalhes quanto a autenticação.

---

<a id="anchor-integracao"></a>
## Integração externa — Produtos

Utilizada a API pública `https://fakestoreapi.com` para validar/obter detalhes de produtos.

Endpoints:

- `GET https://fakestoreapi.com/products` — listar todos
- `GET https://fakestoreapi.com/products/{id}` — buscar por id

---

## Rodando localmente

<p align="right"><a href="#index">🔝 Voltar ao Índice</a></p>

1. Instale dependências:

```cmd
npm install
```

2. Gere o Prisma Client (essencial):

  - Restaure o arquivo de dump (postgresql/aiqfome-dump.sql) ou rode os comandos SQL do arquivo aiqfome-favoritos.sql no banco de dados e schema de sua escolha
  - Altere no arquivo .env a variável DATABASE_URL informando o domínio, banco e schema postgres a ser utilizado
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

<a id="anchor-documentacao"></a>
## Documentação (Swagger)

<p align="right"><a href="#index">🔝 Voltar ao Índice</a></p>

- Gerador: `src/swagger.js` (usa `swagger-autogen`)
- Saída: `swagger.json` (gerado pelo script)
- UI: `swagger-ui-express` (montada em `/swagger`)

Gerar a documentação:

```cmd
npm run swagger
```
ou

```cmd
node src/swagger.js
```

---

<a id="anchor-testes"></a>
## Testes unitários (Jest)

Existem dois arquivos para exemplificar os testes unitários
  - ClienteRepository (cliente.repository.spec.ts)
  - ClienteModel (cliente.model.spec.ts)

No ClienteRepository o método create é validado e no ClienteModel o teste é no validador de email.
São apenas exemplos de como os testes unitários funcionam.

Para rodar os testes ou adicionar em um CI/CD:
```cmd
npm test
```

---

## Docker / Make

<p align="right"><a href="#index">🔝 Voltar ao Índice</a></p>

O repositório inclui um `Makefile` com target `local` para build e run em Docker.

Exemplo manual:

```cmd
docker build -t aiqfome-favoritos-backend:latest .
docker run -d --name aiqfome-favoritos-backend -p 3000:3000 aiqfome-favoritos-backend:latest
```

Use `make local` para executar a sequência definida no `Makefile`.

> IMPORTANTE: Caso utilize utilize o docker / make, não esqueça de alterar no arquivo .env o caminho do postgresql antes
