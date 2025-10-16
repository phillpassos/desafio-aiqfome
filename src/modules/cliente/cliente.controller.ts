import type { Request, Response } from 'express';
import ClienteService from './cliente.service';
import ClienteDomain from '../../domain/cliente.domain';

export default new class ClienteController {
    public async create(req: Request, res: Response) {
        /*  #swagger.tags = ['Clientes']
            #swagger.security = [{ "Bearer": [] }]
            #swagger.description = 'Cria um novo cliente'
            #swagger.parameters['cliente'] = {
              in: 'body',
              description: 'Objeto Cliente',
              required: true,
              schema: { $ref: '#/definitions/ClienteCreate' }
            }
            #swagger.responses[201] = {
              description: 'Cliente criado',
              schema: { $ref: '#/definitions/Cliente' }
            }
        */
        const cliente = new ClienteDomain(req.body);
        try {
            return res.status(201).json(await ClienteService.createOrUpdate(cliente));
        }
        catch (error) {
            console.log(error.message)
            return res.status(400).json({ error: 'Erro ao criar cliente', details: error.message || error });
        }
    }

    public async get(_: Request, res: Response) {
        /*  #swagger.tags = ['Clientes']
            #swagger.security = [{ "Bearer": [] }]
            #swagger.description = 'Obtem a lista de clientes'
            #swagger.responses[200] = {
              description: 'Lista de clientes',
              schema: [{ $ref: '#/definitions/Cliente' }]
            }
        */
        return res.json(await ClienteService.findAll());
    }

    public async getByEmail(req: Request, res: Response) {
        /*  #swagger.tags = ['Clientes']
            #swagger.security = [{ "Bearer": [] }]
            #swagger.description = 'Busca cliente por email'
            #swagger.parameters['email'] = {
              in: 'path',
              description: 'Email do cliente',
              required: true,
              type: 'string'
            }
            #swagger.responses[200] = {
              description: 'Cliente encontrado',
              schema: { $ref: '#/definitions/Cliente' }
            }
            #swagger.responses[404] = { description: 'Cliente não encontrado' }
            #swagger.responses[400] = { description: 'Erro ao buscar cliente' }
        */
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
            return res.status(400).json({ error: 'Erro ao buscar cliente', details: error.message || error });
        }
    }

    public async update(req: Request, res: Response) {
        /*  #swagger.tags = ['Clientes']
            #swagger.security = [{ "Bearer": [] }]
            #swagger.description = 'Atualiza um cliente'
            #swagger.parameters['id'] = {
              in: 'path',
              description: 'ID do cliente',
              required: true,
              type: 'integer'
            }
            #swagger.parameters['cliente'] = {
              in: 'body',
              description: 'Objeto Cliente',
              required: true,
              schema: { $ref: '#/definitions/ClienteCreate' }
            }
            #swagger.responses[200] = {
              description: 'Cliente atualizado',
              schema: { $ref: '#/definitions/Cliente' }
            }
            #swagger.responses[400] = { description: 'ID inválido ou erro de atualização' }
        */
        const cliente = new ClienteDomain(req.body);
        cliente.id = Number(req.params.id);
        if (!cliente.id || isNaN(cliente.id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }
        try {
            return res.json(await ClienteService.createOrUpdate(cliente));
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar cliente', details: error.message || error });
        }
    }

    public async delete(req: Request, res: Response) {
        /*  #swagger.tags = ['Clientes']
        #swagger.security = [{ "Bearer": [] }]
            #swagger.description = 'Remove um cliente'
            #swagger.parameters['id'] = {
              in: 'path',
              description: 'ID do cliente',
              required: true,
              type: 'integer'
            }
            #swagger.responses[200] = { description: 'Cliente removido' }
            #swagger.responses[400] = { description: 'ID inválido' }
            #swagger.responses[404] = { description: 'Cliente não encontrado' }
        */
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