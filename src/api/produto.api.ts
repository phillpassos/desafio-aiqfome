import loggerHelper from "../helpers/logger.helper";

const API_URL = 'https://fakestoreapi.com/products';

async function getProdutoById(id: number) {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) {
        throw new Error(`Erro ao obter produto por ID: ${res.statusText}`);
    }
    try {
        return res.json();
    }
    catch (error) {
        loggerHelper.error('Erro ao parsear JSON do produto');
        return undefined;
    }
}

export default {
    getProdutoById
}
