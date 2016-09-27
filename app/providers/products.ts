import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Product } from '../models/product';

@Injectable()
export class ProductsProvider{

    constructor(private http: Http){

    }

    getProductDetails(uuid: string): Promise<Product> {
        let self = this;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        return this.http
        .get('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/products/uuid/' + uuid, {headers:headers})
        .map((response) => {
            let data = response.json();
            if(data.status == 0){
                var product = new Product();
                product.parseJson(data.product);
                return product;
            } else {
                return null;
            }
        })
        .toPromise();
    }

    getActived(): Promise<Product[]>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        return this.http
        .get('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/products/activated', {headers:headers})
        .map((response) => {
                let data = response.json();
                var products = new Array<Product>();
                for(var i = 0; i < data.products.length; i++){
                    var aux = new Product();
                    aux.parseJson(data.products[i]);
                    products.push(aux);
                }
                return products;
        })
        .toPromise();
    }

    getByName(name): Promise<Product[]>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        return this.http
        .get('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/products/name/'+name, {headers:headers})
        .map((response) => {
                let data = response.json();
                var products = new Array<Product>();
                for(var i = 0; i < data.products.length; i++){
                    var aux = new Product();
                    aux.parseJson(data.products[i]);
                    products.push(aux);
                }
                return products;
        })
        .toPromise();
    }

    getByBrand(uuid): Promise<Product[]>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        return this.http
        .get('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/products/brand/'+uuid, {headers:headers})
        .map((response) => {
                let data = response.json();
                var products = new Array<Product>();
                for(var i = 0; i < data.products.length; i++){
                    var aux = new Product();
                    aux.parseJson(data.products[i]);
                    products.push(aux);
                }
                return products;
        })
        .toPromise();
    }

    getByBarCode(barcode): Promise<Product[]>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        return this.http
        .get('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/products/barcode/'+barcode, {headers:headers})
        .map((response) => {
                let data = response.json();
                var products = new Array<Product>();
                for(var i = 0; i < data.products.length; i++){
                    var aux = new Product();
                    aux.parseJson(data.products[i]);
                    products.push(aux);
                }
                return products;
        })
        .toPromise();
    }

    update(product: Product): Promise<any> {
        let self = this;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        var body = JSON.stringify(product);

        return this.http
        .post('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/products/update', body, {headers:headers})
        .map((response) => {
            let data = response.json();
            return data;
        })
        .toPromise();
    }

    insert(product: Product): Promise<any> {
        let self = this;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        var body = JSON.stringify(product);

        return this.http
        .post('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/products/insert', body, {headers:headers})
        .map((response) => {
            let data = response.json();
            return data;
        })
        .toPromise();
    }
}
