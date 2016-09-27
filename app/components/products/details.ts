import { Component } from '@angular/core';
import { Router, RouteSegment } from '@angular/router';
import { Control, Validators, ControlGroup, FormBuilder, FORM_DIRECTIVES } from '@angular/common';

import { Product } from '../../models/product';
import { Brand } from '../../models/brand';

import { MoneyPipe } from '../../utils/money.pipe';
import { ProductsProvider } from '../../providers/products';
import { NacionalitiesProvider } from '../../providers/nacionalities';
import { BrandsProvider } from '../../providers/brands';

@Component({
    selector: 'productDetails',
    templateUrl: 'views/productDetails.html',
    pipes: [MoneyPipe],
    providers: [ProductsProvider, NacionalitiesProvider, BrandsProvider],
    directives: [FORM_DIRECTIVES],
    styleUrls: ['styles/form.css']
})

export class ProductDetailsComponent {
    token:string = localStorage.getItem('user_token');
    uuid: string = null;
    product: Product;
    nacionalitiesArray: any[];
    brandsArray: Brand[];
    productForm: ControlGroup;
    formError: string;

    constructor(
        private productsProvider: ProductsProvider,
        private nacionalitiesProvider: NacionalitiesProvider,
        private brandsProvider: BrandsProvider,
        private router: Router,
        private segment: RouteSegment,
        private fb: FormBuilder
    ){
        let self = this;
        this.formError = "";
        this.uuid = segment.getParam('uuid');

        this.productForm = new ControlGroup({
            productName: new Control("", Validators.required),
            description: new Control(""),
            unitPrice: new Control("", Validators.required),
            profit: new Control("", Validators.required),
            sellPrice: new Control("", Validators.required),
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

        var currentProduct = this.productsProvider.getProductDetails(this.uuid);
        currentProduct.then((data: Product) => {
            this.product = data;
            (<Control> this.productForm.controls['productName']).updateValue(this.product.productName);
            (<Control> this.productForm.controls['description']).updateValue(this.product.description);
            (<Control> this.productForm.controls['unitPrice']).updateValue(this.product.unitPrice);
            (<Control> this.productForm.controls['profit']).updateValue(this.product.profit);
            (<Control> this.productForm.controls['sellPrice']).updateValue(this.product.sellPrice);
            (<Control> this.productForm.controls['tax']).updateValue(this.product.tax);
            (<Control> this.productForm.controls['measure']).updateValue(this.product.measure);
            (<Control> this.productForm.controls['brand']).updateValue(this.product.brand.uuid);
            (<Control> this.productForm.controls['productGroup']).updateValue(this.product.productGroup);
            (<Control> this.productForm.controls['nacionality']).updateValue(this.product.nacionality);
            (<Control> this.productForm.controls['barCode']).updateValue(this.product.barCode);
            (<Control> this.productForm.controls['stock']).updateValue(this.product.stock);
        }).catch(err => {
            console.log("Error: " + err);
        });
    }

    saveProduct(){
        this.product.parseForm(this.productForm.controls);
        var update = this.productsProvider.update(this.product);
        update.then((data: any) => {
            if(data.status == 1) this.formError = "Erro ao salvar: " + data.error;
            else this.back();
        }).catch(err => {
            this.formError = "Erro ao salvar: " + err;
            console.log("Error: " + err);
        });
    }

    back(){
        this.router.navigate(['/products/list']);
    }
}
