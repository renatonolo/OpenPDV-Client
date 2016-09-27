import { Component } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { SaleNewComponent } from './new';

@Component({
    selector: 'sales',
    templateUrl: 'views/sales.html',
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
    {path: '/new', component: SaleNewComponent},
    {path: '*', component: SaleNewComponent}
])

export class SalesComponent {
    constructor(private router: Router){ }

    ngOnInit(){
        this.router.navigate(['/sales/new']);
    }
}
