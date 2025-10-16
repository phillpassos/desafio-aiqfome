import produtoApi from "../../api/produto.api";
import FavoritoDomain from "../../domain/favorito.domain";
import FavoritosRepository from "./favoritos.repository";

export default class FavoritosService {
    static async create(favorito: FavoritoDomain) {
        try {
            await produtoApi.getProdutoById(favorito.produto.id);
        }
        catch {
            throw new Error('Não foi possível validar o produto');
        }

        return FavoritosRepository.create(favorito);
    }

    static async delete(id: number) {
        return FavoritosRepository.delete(id);
    }

    static async findByIdCliente(id: number) {
        const favoritos = await FavoritosRepository.findByIdCliente(id);
        const retorno: Array<FavoritoDomain> = [];

         for (const fav of favoritos) {
            // O ideal seria fazer um batch request, mas a api não suporta
            // Alem disso, não é boa pratica a responsabilidade de exibir os produtos ser desta api
            // pois como os produtos e seus dados vem de outro lugar, as requisições estão ficando concentradas aqui
            // Também não é boa ideia salvar os dados do produto aqui, pois podem ficar desatualizados
            const produto = await produtoApi.getProdutoById(fav.produto.id);

            if (!produto)
                await FavoritosRepository.delete(fav.id); // remove favoritos com produtos inválidos
            else
                retorno.push(new FavoritoDomain({ ...fav, produto }));
        }
        
        return retorno;
    }
}