import ClienteRepository from './cliente.repository';
import ClienteDomain from '../../domain/cliente.domain';

// Mock do singleton prisma
jest.mock('../../helpers/prisma', () => {
  return {
    __esModule: true,
    default: {
      clientes: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    },
  };
});

import prisma from '../../helpers/prisma';

describe('ClienteRepository.create', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Deve criar um cliente quando o email não esteja duplicado', async () => {
    const cliente = new ClienteDomain({ nome: 'João Silva', email: 'joao@example.com' });
    // @ts-ignore - mock
    prisma.clientes.findUnique.mockResolvedValue(null);

    const clienteCriado = { id: 1, nome: cliente.nome, email: cliente.email };
    // @ts-ignore - mock
    prisma.clientes.create.mockResolvedValue(clienteCriado);

    const result = await ClienteRepository.create(cliente);

    expect(prisma.clientes.findUnique).toHaveBeenCalledWith({ where: { email: cliente.email } });
    expect(prisma.clientes.create).toHaveBeenCalledWith({ data: cliente });
    expect(result).toEqual(clienteCriado);
  });

  it('Deve levantar uma exceção quando o cliente ja existe', async () => {
    const cliente = new ClienteDomain({ nome: 'João Silva', email: 'joao@example.com' });
    // @ts-ignore - mock
    prisma.clientes.findUnique.mockResolvedValue({ id: 2, nome: 'existente', email: cliente.email });

    await expect(ClienteRepository.create(cliente)).rejects.toThrow('Cliente com este email já existe');
    expect(prisma.clientes.create).not.toHaveBeenCalled();
  });
});
