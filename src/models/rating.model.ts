export default class RatingModel {
    rate: number;
    count: number;
    constructor(data: Partial<RatingModel>) {
        this.rate = data.rate;
        this.count = data.count;
    }
}