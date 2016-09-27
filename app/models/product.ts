import { Brand } from './brand';

export class Product{
    uuid: string;
    productName: string;
    description: string;
    unitPrice: number;
    profit: number;
    sellPrice: number;
    tax: number;
    measure: number;
    brand: Brand;
    productGroup: string;
    nacionality: number;
    barCode: number;
    stock: number;

    parseJson(json){
        var brand = new Brand();
        brand.parseJson(json.brand);

        this.uuid = json.uuid;
        this.productName = json.productName;
        this.description = json.description;
        this.unitPrice = json.unitPrice;
        this.profit = json.profit;
        this.sellPrice = json.sellPrice;
        this.tax = json.tax;
        this.measure = json.measure;
        this.brand = brand;
        this.productGroup = json.productGroup;
        this.nacionality = json.nacionality;
        this.barCode = json.barCode;
        this.stock = json.stock;
    }

    parseForm(form){
        this.productName = form['productName'].value;
        this.description = form['description'].value;
        this.unitPrice = form['unitPrice'].value;
        this.profit = form['profit'].value;
        this.sellPrice = form['sellPrice'].value;
        this.tax = form['tax'].value;
        this.measure = form['measure'].value;
        this.brand = form['brand'].value;
        this.productGroup = form['productGroup'].value;
        this.nacionality = form['nacionality'].value;
        this.barCode = form['barCode'].value;
        this.stock = form['stock'].value;
    }
}
