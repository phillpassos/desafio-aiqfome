import ClienteRepository from "./cliente.repository";

export default class ClienteService {
    static async createOrUpdate(cliente: any) {
        if (!cliente.nome || !cliente.email) {
            throw new Error('Nome e email são obrigatórios');
        }

        if(!cliente.validateEmail()) {
            throw new Error('Email inválido');
        }

        if(cliente.id) {
            return ClienteRepository.update(cliente);
        }

        return ClienteRepository.create(cliente);
    }

    static async delete(id: number) {
        return ClienteRepository.delete(id);
    }

    static async findById(id: number) {
        return ClienteRepository.findById(id);
    }

    static async findByEmail(email: string) {
        return ClienteRepository.findByEmail(email);
    }

    static async findAll() {
        return ClienteRepository.findAll();
    }
}