import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';

import { LoginComponent } from './users/login';
import { HomeComponent } from './system/home';
import { ProductsComponent } from './products/default';
import { BrandsComponent } from './brands/default';
import { SalesComponent } from './sales/default';
import { ReportsComponent } from './reports/default';
import { UsersComponent } from './users/default';

@Component({
    selector: 'my-app',
    templateUrl: 'views/main.html',
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
    {path: '/login', component: LoginComponent},
    {path: '/system/home', component: HomeComponent},
    {path: '/products', component: ProductsComponent},
    {path: '/brands', component: BrandsComponent},
    {path: '/sales', component: SalesComponent},
    {path: '/reports', component: ReportsComponent},
    {path: '/users', component: UsersComponent},
    {path: '*', component: LoginComponent}
])

export class AppComponent implements OnInit{
    constructor(private router: Router){ }

    ngOnInit(){
        this.router.navigate(['/login']);
    }
}
