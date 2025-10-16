import RatingModel from "./rating.model";

export default class ProdutoExternoModel {
    id?: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: RatingModel;

    constructor(data: Partial<ProdutoExternoModel>) {
        this.id = data.id;
        this.title = data.title;
        this.price = data.price;
        this.description = data.description;
        this.category = data.category;
        this.image = data.image;
        this.rating = data.rating && new RatingModel(data.rating);
    }
}