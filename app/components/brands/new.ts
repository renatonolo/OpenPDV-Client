import { Component, OnInit } from '@angular/core';
import { Router, RouteSegment } from '@angular/router';
import { Control, Validators, ControlGroup, FormBuilder, FORM_DIRECTIVES } from '@angular/common';

import { Brand } from '../../models/brand';

import { BrandsProvider } from '../../providers/brands';

@Component({
    selector: 'brandNew',
    templateUrl: 'views/brandNew.html',
    providers: [BrandsProvider],
    directives: [FORM_DIRECTIVES],
    styleUrls: ['styles/form.css']
})

export class BrandNewComponent {
    brand: Brand;
    brandForm: ControlGroup;
    formError: string = "";

    constructor(
        private brandsProvider: BrandsProvider,
        private router: Router,
        private segment: RouteSegment,
        private fb: FormBuilder
    ){ }

    ngOnInit(){
        this.brand = new Brand();
        this.brandForm = new ControlGroup({
            name: new Control("", Validators.required),
            status: new Control("", Validators.required)
        });
    }

    insertBrand(){
        this.brand.parseForm(this.brandForm.controls);
        var insert = this.brandsProvider.insert(this.brand);
        insert.then((data: any) => {
            if(data.status == 1) this.formError = "Erro ao inserir: " + data.error;
            else this.back();
        }).catch(err => {
            this.formError = "Erro ao inserir: " + err;
            console.log("Error: " + err);
        });
    }

    back(){
        this.router.navigate(['/brands/list']);
    }
}
