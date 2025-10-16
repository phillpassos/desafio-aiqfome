export default class ClienteModel {
    id?: number;
    nome: string;
    email: string;

    constructor(data: Partial<ClienteModel>) {
        this.id = data.id;
        this.nome = data.nome && data.nome.trim();
        this.email = data.email && data.email.trim().toLowerCase();
    }

    validateEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return this.email ? emailRegex.test(this.email) : false;
    }
}