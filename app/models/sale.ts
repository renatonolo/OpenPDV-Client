import { Product } from './product';

export class Sale{
    uuid: string;
    date: number;
    products: Product[];
    amount: number[];
    values: number[];
    saleOff: number;

    parseJson(json){
        this.uuid = json.uuid;
        this.date = json.date;
        this.saleOff = 0;
    }
}
