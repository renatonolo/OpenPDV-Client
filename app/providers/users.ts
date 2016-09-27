import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { User } from '../models/user';

@Injectable()
export class UsersProvider{

    constructor(private http: Http){

    }

    login(username: string, password: string): Promise<any> {
        let self = this;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        let body = JSON.stringify({'username': username, 'password': password});

        return this.http
        .post('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/user/login', body, {headers:headers})
        .map((response) => {
            let data = response.json();
            if(data.status == 0){
                var user = new User();
                user.parseJson(data.data);
                return user;
            } else return data;
        })
        .toPromise();
    }

    getAll(): Promise<any>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        return this.http
        .get('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/user/list', {headers:headers})
        .map((response) => {
                let data = response.json();
                var users = new Array<any>();
                for(var i = 0; i < data.users.length; i++){
                    var aux = new User();
                    aux.parseJson(data.users[i]);
                    users.push(aux);
                }
                return users;
        })
        .toPromise();
    }

    changePassword(username: string, oldPassword: string, newPassword: string): Promise<any> {
        let self = this;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        let body = JSON.stringify({'username': username, 'oldPassword': oldPassword, 'newPassword': newPassword});

        return this.http
        .post('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/user/changePassword', body, {headers:headers})
        .map((response) => {
            let data = response.json();
            return data;
        })
        .toPromise();
    }
}
