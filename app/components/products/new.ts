import { Component, OnInit } from '@angular/core';
import { Router, RouteSegment } from '@angular/router';
import { Control, Validators, ControlGroup, FormBuilder, FORM_DIRECTIVES } from '@angular/common';

import { Product } from '../../models/product';
import { Brand } from '../../models/brand';

import { ProductsProvider } from '../../providers/products';
import { NacionalitiesProvider } from '../../providers/nacionalities';
import { BrandsProvider } from '../../providers/brands';

@Component({
    selector: 'productNew',
    templateUrl: 'views/productNew.html',
    providers: [ProductsProvider, NacionalitiesProvider, BrandsProvider],
    directives: [FORM_DIRECTIVES],
    styleUrls: ['styles/form.css']
})

export class ProductNewComponent {
    product: Product;
    nacionalitiesArray: any[];
    brandsArray: Brand[];
    productForm: ControlGroup;
    formError: string = "";

    constructor(
        private productsProvider: ProductsProvider,
        private nacionalitiesProvider: NacionalitiesProvider,
        private brandsProvider: BrandsProvider,
        private router: Router,
        private segment: RouteSegment,
        private fb: FormBuilder
    ){ }

    ngOnInit(){
        this.product = new Product();
        this.productForm = new ControlGroup({
            productName: new Control("", Validators.required),
            description: new Control(""),
            unitPrice: new Control("", Validators.required),
            profit: new Control("", Validators.required),
            sellPrice: new Control(""),
            tax: new Control("", Validators.required),
            measure: new Control(""),
            brand: new Control(""),
            productGroup: new Control(""),
            nacionality: new Control(""),
            barCode: new Control(""),
            stock: new Control("")
        });

        var nacionalities = this.nacionalitiesProvider.getAll();
        nacionalities.then((data: any) => {
            this.nacionalitiesArray = data;
        }).catch(err => {
            console.log("Error: " + err);
        });

        var brands = this.brandsProvider.getAll();
        brands.then((data: Brand[]) => {
            this.brandsArray = data;
        }).catch(err => {
            console.log("Error: " + err);
        });
    }

    insertProduct(){
        this.product.parseForm(this.productForm.controls);
        var insert = this.productsProvider.insert(this.product);
        insert.then((data: any) => {
            if(data.status == 1) this.formError = "Erro ao inserir: " + data.error;
            else this.back();
        }).catch(err => {
            this.formError = "Erro ao inserir: " + err;
            console.log("Error: " + err);
        });
    }

    back(){
        this.router.navigate(['/products/list']);
    }
}
