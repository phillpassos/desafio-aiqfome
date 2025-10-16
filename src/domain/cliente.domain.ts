import ClienteModel from '../models/cliente.model';

export default class ClienteDomain extends ClienteModel {
    
    constructor(data: Partial<ClienteDomain>) {
        super(data);
    }
}