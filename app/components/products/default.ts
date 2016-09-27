import { Component } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { ProductsListComponent } from './list';
import { ProductDetailsComponent } from './details';
import { ProductNewComponent } from './new';

@Component({
    selector: 'products',
    templateUrl: 'views/products.html',
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
    {path: '/list', component: ProductsListComponent},
    {path: '/details/:uuid', component: ProductDetailsComponent},
    {path: '/new', component: ProductNewComponent},
    {path: '*', component: ProductsListComponent}
])

export class ProductsComponent {
    constructor(private router: Router){ }

    ngOnInit(){
        this.router.navigate(['/products/list']);
    }
}
