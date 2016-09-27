import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Sale } from '../models/sale'

@Injectable()
export class ReportsProvider{

    constructor(private http: Http){

    }

    salesReport(start: string, end: string, page: number): Promise<Sale>{
        let self = this;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        return this.http
        .get('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/reports/sales/' + start + "/" + end + "/" + page, {headers:headers})
        .map((response) => {
            let data = response.json();
            return data;
        })
        .toPromise();
    }
}
