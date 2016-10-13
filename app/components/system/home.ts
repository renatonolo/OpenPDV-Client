import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: 'views/home.html',
    styleUrls: ['styles/main.css']
})

export class HomeComponent {
    token:string = localStorage.getItem('user_token');
    permissions:any = JSON.parse(localStorage.getItem('user_permissions'));

    constructor(private router: Router){ }

    goToSales(){
        this.router.navigateByUrl('/sales');
    }

    goToProducts(){
        this.router.navigateByUrl('/products');
    }

    goToBrands(){
        this.router.navigateByUrl('/brands');
    }

    goToReports(){
        this.router.navigateByUrl('/reports');
    }

    goToUsers(){
        this.router.navigateByUrl('/users');
    }

    logoff(){
        localStorage.removeItem('user_lastLogin');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_token');
        this.router.navigate(['/login']);
    }
}
