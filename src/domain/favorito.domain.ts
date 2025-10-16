import FavoritosModel from '../models/favorito.model';

export default class FavoritoDomain extends FavoritosModel {
    
    constructor(data: Partial<FavoritoDomain>) {
        super(data);
    }
}