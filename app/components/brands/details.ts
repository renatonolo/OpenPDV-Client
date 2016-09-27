import { Component } from '@angular/core';
import { Router, RouteSegment } from '@angular/router';
import { Control, Validators, ControlGroup, FormBuilder, FORM_DIRECTIVES } from '@angular/common';

import { Product } from '../../models/product';
import { Brand } from '../../models/brand';

import { ProductsProvider } from '../../providers/products';
import { BrandsProvider } from '../../providers/brands';

@Component({
    selector: 'brandDetails',
    templateUrl: 'views/brandDetails.html',
    providers: [BrandsProvider, ProductsProvider],
    directives: [FORM_DIRECTIVES],
    styleUrls: ['styles/form.css']
})

export class BrandDetailsComponent {
    token:string = localStorage.getItem('user_token');
    uuid: string = null;
    brand: Brand;
    products: Product[];
    countProducts: Number;
    brandForm: ControlGroup;
    formError: string;

    constructor(
        private productsProvider: ProductsProvider,
        private brandsProvider: BrandsProvider,
        private router: Router,
        private segment: RouteSegment,
        private fb: FormBuilder
    ){
        let self = this;
        this.formError = "";
        this.uuid = segment.getParam('uuid');

        this.brandForm = new ControlGroup({
            name: new Control("", Validators.required),
            status: new Control("", Validators.required)
        });

        var currentBrand = this.brandsProvider.getBrandDetails(this.uuid);
        currentBrand.then((data: Brand) => {
            this.brand = data;
            (<Control> this.brandForm.controls['name']).updateValue(this.brand.name);
            (<Control> this.brandForm.controls['status']).updateValue(this.brand.status);
        }).catch(err => {
            console.log("Error: " + err);
        });

        var currentProducts = this.productsProvider.getByBrand(this.uuid);
        currentProducts.then((data: Product[]) => {
            this.products = data;
            this.countProducts = this.products.length;
        }).catch(err => {
            console.log("Error: " + err);
        });
    }

    saveBrand(){
        this.brand.parseForm(this.brandForm.controls);
        var update = this.brandsProvider.update(this.brand);
        update.then((data: any) => {
            if(data.status == 1) this.formError = "Erro ao salvar: " + data.error;
            else this.back();
        }).catch(err => {
            this.formError = "Erro ao salvar: " + err;
            console.log("Error: " + err);
        });
    }

    goToProduct(uuid){
        this.router.navigateByUrl('/products/details/' + uuid);
    }

    back(){
        this.router.navigate(['/brands/list']);
    }
}
