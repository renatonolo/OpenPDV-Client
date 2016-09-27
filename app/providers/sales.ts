import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Sale } from '../models/sale'

@Injectable()
export class SalesProvider{

    constructor(private http: Http){

    }

    new(products:Array<any>, saleOff:number): Promise<any> {
        let self = this;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        let body = JSON.stringify({'token': localStorage.getItem('user_token'), 'products': products, 'saleOff': saleOff});

        return this.http
        .post('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/sales/new', body, {headers:headers})
        .map((response) => {
            let data = response.json();
            console.log(data);
            return data;
        })
        .toPromise();
    }

    addPayment(sale: string, type: number, payment: any){
        let self = this;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        let body = JSON.stringify({'sale': sale, 'type': type, 'payment': payment});

        return this.http
        .post('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/sales/addPayment', body, {headers:headers})
        .map((response) => {
            let data = response.json();
            return data;
        })
        .toPromise();
    }

    details(uuid: string): Promise<any>{
        let self = this;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        return this.http
        .get('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/sales/details/' + uuid, {headers:headers})
        .map((response) => {
            let data = response.json();
            return data;
        })
        .toPromise();
    }
}
