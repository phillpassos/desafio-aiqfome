import ProdutoModel from '../models/produto-externo.model';

export default class ProdutoDomain extends ProdutoModel {
    
    constructor(data: Partial<ProdutoDomain>) {
        super(data);
    }
}