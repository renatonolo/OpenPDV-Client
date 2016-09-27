import { Component } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { UserListComponent } from './list';

@Component({
    selector: 'users',
    templateUrl: 'views/users.html',
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
    {path: '/list', component: UserListComponent},
    {path: '*', component: UserListComponent}
])

export class UsersComponent {
    constructor(private router: Router){ }

    ngOnInit(){
        this.router.navigate(['/users/list']);
    }
}
