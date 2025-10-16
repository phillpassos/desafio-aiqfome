Consideramos então que o problema é um micro serviço especifico
Utilizaremos o express pelo minimalismo

Utilizaremos o prisma para facilitar o acesso ao banco de dados e fazer um db-first

endpoints - 

  Clientes - 
    Post
    Get
    Put
    Delete

  Favoritos
    Post
    Delete

  Auth
    Post - login - retorna um jwt
    Delete - login - recebe o jwt e exclui

Estrutura = 
  cliente
    id - unique
    nome
    email - unique

  Cliente - favorito

    idfavorito - unique
    idcliente - idProdutoExterno + idCliente = unique
    idProdutoExterno - unique


A api deve ter autenticação e autorização. Porem, no caso de um micro serviço, a verificação da autenticação deveria vir de outro lugar
Vou criar um endpoint que gera um token jwt e um que remove, porem, no serviço deveria apenas haver um guard confirmando a autenticação, talvez diretamente num redis
Utilizarei o sawgger-autogen para gerar a documentação baseado em comentario e o swagger-ui-express para gerar a interface
Não irei adicionar cabeçalhos de segurança pois se tratando de um micro serviço, geralmente fica atras de um service discovery ou nginx



Clientes

Criar, visualizar, editar e remover clientes.
Dados obrigatórios: nome e e-mail.
Um mesmo e-mail não pode se repetir no cadastro.
Favoritos

Um cliente deve ter uma lista de produtos favoritos.
Os produtos devem ser validados via API externa (link fornecido abaixo).
Um produto não pode ser duplicado na lista de um cliente.
Produtos favoritos devem exibir: ID, título, imagem, preço e review (se houver).
Requisitos de Integração

 Sugerimos o uso de uma API genérica para buscar produtos. Porém, para facilitar a execução e deixar tudo mais direto ao ponto, recomendamos o uso da seguinte API pública:

🔗 https://fakestoreapi.com/docs

Você pode utilizar especificamente estes dois endpoints:

Listar todos os produtos:
GET https://fakestoreapi.com/products

Buscar produto por ID:
GET https://fakestoreapi.com/products/{id}

Confira algumas dicas aqui
⚖️ Regras Gerais

A API deve ser pública, mas conter autenticação e autorização.
Evite duplicidade de dados.
Estruture bem o código, seguindo boas práticas REST.
Pense em performance e escalabilidade.
Documente sua API (OpenAPI/Swagger é bem-vindo, mas opcional).
Não use IA ou cópias. Será passível de eliminação.