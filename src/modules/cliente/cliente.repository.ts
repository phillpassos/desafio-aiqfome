import type ClienteDomain from '../../domain/cliente.domain';
import prisma from '../../helpers/prisma';

export default class ClienteRepository {
    static async create(cliente: ClienteDomain) {
        return prisma.clientes.create({
            data: cliente
        });
    }

    static async update(cliente: ClienteDomain) {
        return prisma.clientes.update({
            where: { id: cliente.id },
            data: cliente
        });
    }

    static async delete(id: number) {
        return prisma.clientes.delete({
            where: { id }
        });
    }

    static async findById(id: number) {
        return prisma.clientes.findUnique({
            where: { id }
        });
    }

    static async findByEmail(email: string) {
        return prisma.clientes.findUnique({
            where: { email }
        });
    }

    static async findAll() {
        return prisma.clientes.findMany();
    }
}