import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Http, Headers } from '@angular/http';

import { MoneyPipe } from '../../utils/money.pipe';

import { User } from '../../models/user';

import { UsersProvider } from '../../providers/users';

@Component({
    selector: 'usersList',
    templateUrl: 'views/usersList.html',
    pipes: [MoneyPipe],
    providers: [UsersProvider],
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['styles/main.css']
})

export class UserListComponent {
    token: string = localStorage.getItem('user_token');
    users: any;
    user: any = null;
    username: string = localStorage.getItem('user_username');
    updatePasswordError: string = "";

    constructor(
        private usersProvider: UsersProvider,
        private router: Router,
        private http: Http
    ){
        this.getAll();
    }

    getAll(){
        var user = this.usersProvider.getAll();
        user.then((data: User[]) => {
            this.users = data;
        }).catch(err => {
            console.log("Error: " + err);
        });
    }

    goToDetails(u){
        this.user = u;
    }

    hideUser(){
        this.user = null;
    }

    updatePassword(oldPassword, newPassword, newPasswordAgain){
        if(oldPassword == "" || newPassword == "" || newPasswordAgain == "") {
            this.updatePasswordError = "Preencha todos os campos para alterar a senha.";
            return;
        }
        if(newPassword != newPasswordAgain){
            this.updatePasswordError = "Os campos de nova senha estão diferentes.";
            return;
        } else {
            this.updatePasswordError = "";
            var user = this.usersProvider.changePassword(this.username, oldPassword, newPassword);
            user.then((data: any) => {
                console.log(data);
                if(data.status == 1) this.updatePasswordError = data.error;
                else {
                    this.updatePasswordError = "";
                    this.hideUser();
                }
            }).catch(err => {
                console.log("Error: " + err);
            });
        }
    }

    goToInsert(){
        this.router.navigateByUrl('/users/new');
    }

    back(){
        this.router.navigateByUrl('/users');
    }
}
