import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Http, Headers } from '@angular/http';

import { Brand } from '../../models/brand';

import { BrandsProvider } from '../../providers/brands';

@Component({
    selector: 'brandsList',
    templateUrl: 'views/brandsList.html',
    providers: [BrandsProvider],
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['styles/main.css']
})

export class BrandsListComponent {
    token:string = localStorage.getItem('user_token');
    brands:Brand[];

    constructor(
        private brandsProvider: BrandsProvider,
        private router: Router,
        private http: Http
    ){
        this.getAll();
    }

    getAll(){
        var brands = this.brandsProvider.getAll();
        brands.then((data: Brand[]) => {
            this.brands = data;
        }).catch(err => {
            console.log("Error: " + err);
        });
    }

    search(brand, keypress){
        if(brand.length == 0) {
            this.getAll();
            return;
        }
        if(keypress && brand.length < 3 && brand.length > 0) return;
        var bran = this.brandsProvider.getByName(brand);
        bran.then((data: Brand[]) => {
            this.brands = data;
        }).catch(err => {
            console.log("Error: " + err);
        });
    }

    deactive(brand){
        var bran = this.brandsProvider.deactive(brand);
        bran.then((data: any) => {
            if(data.status == 1){
                console.log("Error: " + data.error);
            } else {
                this.getAll();
                console.log("Deactived");
            }
        }).catch(err => {
            console.log("Error: " + err);
        });
    }

    active(brand){
        var bran = this.brandsProvider.active(brand);
        bran.then((data: any) => {
            if(data.status == 1){
                console.log("Error: " + data.error);
            } else {
                this.getAll();
                console.log("Actived");
            }
        }).catch(err => {
            console.log("Error: " + err);
        });
    }

    goToDetails(uuid){
        this.router.navigateByUrl('/brands/details/'+uuid);
    }

    goToInsert(){
        this.router.navigateByUrl('/brands/new');
    }

    back(){
        this.router.navigateByUrl('/brands');
    }
}
