import type { Request, Response } from 'express';
import FavoritosService from './favoritos.service';
import FavoritoDomain from '../../domain/favorito.domain';

export default new class FavoritosController {
    public async create(req: Request, res: Response) {
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