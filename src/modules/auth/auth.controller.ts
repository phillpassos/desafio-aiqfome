import jwtHelper from '../../helpers/jwt.helper';
import type { Request, Response } from 'express';

export default new class AuthController {
    // Não vou entrar em detalhes nesta rota. Vou apenas gerar o token de acordo com o nome e email
    // passados pelo payload.
    // Em um cenário real, deveriamos autenticar por outro serviço ou validar o usuário e senha com um banco de dados.
    public async authorize(req: Request, res: Response) {
        /*  #swagger.tags = ['Login']
            #swagger.description = 'Gera um token JWT baseado nas informações enviadas'
            #swagger.parameters['credenciais'] = {
              in: 'body',
              description: 'Objeto de credenciais',
              required: true,
              schema: { $ref: '#/definitions/Credenciais' }
            }
            #swagger.responses[200] = {
              description: 'Token de acesso gerado',
              schema: { $ref: '#/definitions/Token' }
            }
        */
        const {nome, email} = req.body;
        if(!nome || !email) return res.status(400).json({message: "Nome e email são obrigatórios"}); // Bad Request
        const token = await jwtHelper.generateToken({nome, email});
        return res.json({token});
    }
}