import type { Request, Response } from 'express';
import ClienteService from './cliente.service';
import ClienteDomain from '../../domain/cliente.domain';

export default new class ClienteController {
    public async create(req: Request, res: Response) {
        const cliente = new ClienteDomain(req.body);
        try {
            return res.json(await ClienteService.createOrUpdate(cliente));
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao criar cliente', details: error });
        }
    }

    public async get(_: Request, res: Response) {
        return res.json(await ClienteService.findAll());
    }

    public async getByEmail(req: Request, res: Response) {
        const { email } = req.params;
        if (!email) {
            return res.status(400).json({ error: 'Email inválido' });
        }
        try {
            const cliente = await ClienteService.findByEmail(email);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            return res.json(cliente);
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao buscar cliente', details: error });
        }
    }
    
    public async update(req: Request, res: Response) {
        const cliente = new ClienteDomain(req.body);
        cliente.id = Number(req.params.id);
        if (!cliente.id || isNaN(cliente.id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }
        try {
            return res.json(await ClienteService.createOrUpdate(cliente));
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar cliente', details: error });
        }
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        try {
            return res.json(await ClienteService.delete(Number(id)));
        }
        catch (error) {
            return res.status(400).json({ error: 'Cliente não encontrado' });
        }
    }
}