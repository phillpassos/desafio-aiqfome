import ClienteModel from "./cliente.model";
import produtoModel from "./produto-externo.model";

export default class FavoritosModel {
    id?: number;
    cliente: ClienteModel;
    produto?: produtoModel

    constructor(data: Partial<FavoritosModel>) {
        this.id = data.id;
        this.cliente = data.cliente && new ClienteModel(data.cliente);
        this.produto = data.produto && new produtoModel(data.produto);
    }
}