import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Http, Headers } from '@angular/http';

import { MoneyPipe } from '../../utils/money.pipe';

import { Product } from '../../models/product';

import { ProductsProvider } from '../../providers/products';

@Component({
    selector: 'productsList',
    templateUrl: 'views/productsList.html',
    pipes: [MoneyPipe],
    providers: [ProductsProvider],
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['styles/main.css']
})

export class ProductsListComponent {
    token:string = localStorage.getItem('user_token');
    products:any;

    constructor(
        private productsProvider: ProductsProvider,
        private router: Router,
        private http: Http
    ){
        this.getAll();
    }

    getAll(){
        var prod = this.productsProvider.getActived();
        prod.then((data: Product[]) => {
            this.products = data;
        }).catch(err => {
            console.log("Error: " + err);
        });
    }

    search(product, keypress){
        if(product.length == 0) {
            this.getAll();
            return;
        }
        if(keypress && product.length < 3 && product.length > 0) return;
        var prod = this.productsProvider.getByName(product);
        prod.then((data: Product[]) => {
            this.products = data;
        }).catch(err => {
            console.log("Error: " + err);
        });
    }

    goToDetails(uuid){
        this.router.navigateByUrl('/products/details/'+uuid);
    }

    goToInsert(){
        this.router.navigateByUrl('/product/new');
    }

    back(){
        this.router.navigateByUrl('/products');
    }
}
