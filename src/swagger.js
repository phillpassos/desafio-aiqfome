import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';

dotenv.config();

const doc = {
    swagger: '2.0',
    info: {
        title: 'Aiqfome favoritos API',
        description: ''
    },
    host: `${process.env.HOST}:${process.env.PORT}`,
    basePath: '/api',
    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: "Insira o token JWT como: 'Bearer <token>'"
        }
    },
    // opcional: aplica auth globalmente. Remova se quiser aplicar por rota.
    security: [{ Bearer: [] }],
    definitions: {
        ClienteCreate: {
            nome: 'João Silva',
            email: 'joao@exemplo.com'
        },
        Cliente: {
            id: 1,
            nome: 'João Silva',
            email: 'joao@exemplo.com'
        },
        FavoritoCreate: {
            cliente: { $ref: '#/definitions/Cliente' },
            produto: { $ref: '#/definitions/Produto' },
        },
        Favorito: {
            id: 1,
            cliente: { $ref: '#/definitions/Cliente' },
            produto: { $ref: '#/definitions/Produto' },
        },
        Produto: {
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 109.95,
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
            rating: { $ref: '#/definitions/Rating' }
        },
        ProdutoFavoritoCreate: {
            id: 1
        },
        Rating: {
            rate: 3.9,
            count: 120
        },
        Credenciais: {
            nome: 'admin',
            email: 'admin@localhost.com'
        },
        Token: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjA1NzM5NDgsImRhdGEiOnsibm9tZSI6IlRFc3RlIiwiZW1haWwiOiJwaGlsbGlwQHRlc3RlLmNvbSJ9LCJpYXQiOjE3NjA1NzAzNDh9.FBz5bp2oX1P32AGV6E-VM65RkQ0OqyATjRvAVHs4Rvw'
        }
    }
};

const outputFile = '../swagger.json';
const routes = ['./routes.ts'];

swaggerAutogen()(outputFile, routes, doc);