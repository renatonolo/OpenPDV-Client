import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { FormBuilder, ControlGroup, Control, Validators, FORM_DIRECTIVES } from '@angular/common';

import { UsersProvider } from '../../providers/users';
//import { User } from '../../models/user';

@Component({
    selector: 'login',
    templateUrl: 'views/login.html',
    styleUrls: ['styles/login.css', 'styles/form.css'],
    directives: [FORM_DIRECTIVES],
    providers: [UsersProvider],
})

export class LoginComponent {
    isLogedIn:Boolean=false;
    loginError:string="";
    rememberMe:Boolean=false;
    varShowSettings:Boolean=false;
    msgErrorSettings:string="";
    txtHost:string=localStorage.getItem('hostAPI');
    txtPort:string=localStorage.getItem('portAPI');
    loginForm: ControlGroup;

    constructor(
        private usersProvider: UsersProvider,
        private http: Http,
        private router: Router,
        private fb: FormBuilder
    ){
        this.loginForm = new ControlGroup({
            username: new Control("", Validators.required),
            password: new Control("", Validators.required),
            rememberMe: new Control("false")
        });

        if(this.txtHost == null) this.txtHost = '127.0.0.1';
        if(this.txtPort == null) this.txtPort = '8000';
        if(localStorage.getItem('user_rememberMe') && localStorage.getItem('user_rememberMe') == 'true'){
            this.rememberMe = true;
            (<Control> this.loginForm.controls['username']).updateValue(localStorage.getItem('user_username'));
            (<Control> this.loginForm.controls['password']).updateValue(localStorage.getItem('user_password'));
            (<Control> this.loginForm.controls['rememberMe']).updateValue(true);
        } else {
            this.rememberMe = false;
            (<Control> this.loginForm.controls['rememberMe']).updateValue(false);
        }
    }

    checkRememberMe(checked){
        if(checked) {
            this.rememberMe = true;
            localStorage.setItem('user_rememberMe', 'true');
        } else {
            this.rememberMe = false;
            localStorage.removeItem('user_rememberMe');
            (<Control> this.loginForm.controls['username']).updateValue("");
            (<Control> this.loginForm.controls['password']).updateValue("");
        }
    }

    showSettings(){
        this.varShowSettings = true;
    }

    hideSettings(){
        this.varShowSettings = false;
    }

    saveSettings(){
        let regexIp = new RegExp('^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$');

        if(regexIp.test(this.txtHost)) {
            this.msgErrorSettings = "";
            localStorage.setItem("hostAPI", this.txtHost);
        } else {
            this.msgErrorSettings = "IP inválido.";
            return;
        }

        if(!isNaN(Number(this.txtPort))){
            this.msgErrorSettings = "";
            localStorage.setItem("portAPI", this.txtPort);
        } else {
            this.msgErrorSettings = "Porta inválida";
            return;
        }

        this.hideSettings();
    }

    doLogin(){
        var username = this.loginForm.controls['username'].value;
        var password = this.loginForm.controls['password'].value;

        if(username == '') {
            this.loginError = "Empty username.";
            return;
        } else if(password == '') {
            this.loginError = "Empty password.";
            return;
        } else this.loginError = "";

        var login = this.usersProvider.login(username, password);
        login.then((data: any) => {
            if(data.token){
                localStorage.setItem('user_lastLogin', data.last_login);
                localStorage.setItem('user_name', data.name);
                localStorage.setItem('user_token', data.token);
                localStorage.setItem('user_username', data.username);
                localStorage.setItem('user_permissions', JSON.stringify(data.permissions));
                if(this.rememberMe) {
                    localStorage.setItem('user_password', password);
                    localStorage.setItem('user_rememberMe', 'true');
                }
                else {
                    localStorage.removeItem('user_password');
                    localStorage.removeItem('user_rememberMe');
                }
                this.router.navigateByUrl('/system/home');
            } else {
                localStorage.removeItem('user_lastLogin');
                localStorage.removeItem('user_name');
                localStorage.removeItem('user_token');
                localStorage.removeItem('user_username');
                localStorage.removeItem('user_permissions');
                this.loginError = 'Usuário ou senha inválidos. Tente novamente.';
            }
        }).catch(err => {
            this.loginError = "Error: " + err;
            console.log("Error: " + err);
        });
    }
}
