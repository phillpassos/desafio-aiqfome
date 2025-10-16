import ClienteDomain from '../../domain/cliente.domain';
import FavoritosDomain from '../../domain/favorito.domain';
import prisma from '../../helpers/prisma';
import ProdutoDomain from '../../domain/produto.domain';

export default class FavoritosRepository {
    static async create(favorito: FavoritosDomain) {
        const { produto, cliente } = favorito;

        return prisma.favoritos.create({
            data: {
                id_cliente: cliente.id,
                id_produto_externo: produto.id,
            }
        });
    }

    static async delete(id: number) {
        return prisma.favoritos.delete({
            where: { id }
        });
    }

    static async findByIdCliente(id: number) {
        const favoritos = await prisma.favoritos.findMany({
            where: { id_cliente: id }
        });
        return favoritos.map((fav)=>(new FavoritosDomain({
            id: fav.id,
            cliente: new ClienteDomain({ id: fav.id_cliente }),
            produto: new ProdutoDomain({ id: fav.id_produto_externo })
        })));
    }

    static async findAll() {
        return prisma.favoritos.findMany();
    }
}