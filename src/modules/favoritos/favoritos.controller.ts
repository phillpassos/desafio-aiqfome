import type { Request, Response } from 'express';
import FavoritosService from './favoritos.service';
import FavoritoDomain from '../../domain/favorito.domain';

export default new class FavoritosController {
    public async create(req: Request, res: Response) {
        /*  #swagger.tags = ['Favoritos']
            #swagger.security = [{ "Bearer": [] }]
            #swagger.description = 'Cria um favorito para um cliente'
            #swagger.parameters['idCliente'] = {
              in: 'path',
              description: 'ID do cliente',
              required: true,
              type: 'integer'
            }
            #swagger.parameters['produto'] = {
              in: 'body',
              description: 'Produto a ser vinculado ao cliente',
              required: true,
              schema: { $ref: '#/definitions/ProdutoFavoritoCreate' }
            }
            #swagger.responses[200] = {
              description: 'Favorito criado',
              schema: { $ref: '#/definitions/Favorito' }
            }
        */
        const { idCliente } = req.params;
        const favorito = new FavoritoDomain({cliente:{id: Number(idCliente)}, ...req.body});
        if (!idCliente || !favorito.produto?.id) {
            return res.status(400).json({ error: 'ID do cliente ou do produto inválido' });
        }
       try {
            return res.json(await FavoritosService.create(favorito));
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao criar favorito', details: error });
        }
    }

    public async get(req: Request, res: Response) {
        /*  #swagger.tags = ['Favoritos']
            #swagger.security = [{ "Bearer": [] }]
            #swagger.description = 'Obtem os favoritos de um cliente'
            #swagger.parameters['idCliente'] = {
              in: 'path',
              description: 'ID do cliente',
              required: true,
              type: 'integer'
            }
            #swagger.responses[200] = {
              description: 'Lista de favoritos',
              schema: [{ $ref: '#/definitions/Favorito' }]
            }
        */
        const { idCliente } = req.params;
        if (!idCliente || isNaN(Number(idCliente))) {
            return res.status(400).json({ error: 'ID do cliente inválido' });
        }
        try {
            return res.json(await FavoritosService.findByIdCliente(Number(idCliente)));
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao buscar favoritos', details: error });
        }
    }

    public async delete(req: Request, res: Response) {
        /*  #swagger.tags = ['Favoritos']
            #swagger.security = [{ "Bearer": [] }]
            #swagger.description = 'Remove um favorito por id'
            #swagger.parameters['id'] = {
              in: 'path',
              description: 'ID do favorito',
              required: true,
              type: 'integer'
            }
            #swagger.responses[200] = { description: 'Favorito removido' }
            #swagger.responses[400] = { description: 'Id inválido' }
            #swagger.responses[404] = { description: 'Favorito não encontrado' }
        */
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID inválido' });
        }
        try {
            return res.json(await FavoritosService.delete(Number(id)));
        }
        catch (error) {
            return res.status(400).json({ error: 'Favorito não encontrado' });
        }
    }
}