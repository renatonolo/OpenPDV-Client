import { Component } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { BrandsListComponent } from './list';
import { BrandDetailsComponent } from './details';
import { BrandNewComponent } from './new';

@Component({
    selector: 'brands',
    templateUrl: 'views/brands.html',
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
    {path: '/list', component: BrandsListComponent},
    {path: '/details/:uuid', component: BrandDetailsComponent},
    {path: '/new', component: BrandNewComponent},
    {path: '*', component: BrandsListComponent}
])

export class BrandsComponent {
    constructor(private router: Router){ }

    ngOnInit(){
        this.router.navigate(['/brands/list']);
    }
}
