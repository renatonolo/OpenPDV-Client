import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Brand } from '../models/brand'

@Injectable()
export class BrandsProvider{

    constructor(private http: Http){

    }

    getAll(): Promise<Brand[]> {
        let self = this;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        return this.http
        .get('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/brands', {headers:headers})
        .map((response) => {
            let data = response.json();
            if(data.status == 0){
                var brands = new Array<Brand>();
                for(var i = 0; i < data.brands.length; i++){
                    var aux = new Brand();
                    aux.parseJson(data.brands[i]);
                    brands.push(aux);
                }
                return brands;
            } else {
                return null;
            }
        })
        .toPromise();
    }

    getByName(name): Promise<Brand[]> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        return this.http
        .get('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/brands/name/'+name, {headers:headers})
        .map((response) => {
                let data = response.json();
                var brands = new Array<Brand>();
                for(var i = 0; i < data.brands.length; i++){
                    var aux = new Brand();
                    aux.parseJson(data.brands[i]);
                    brands.push(aux);
                }
                return brands;
        })
        .toPromise();
    }

    getBrandDetails(uuid): Promise<Brand>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        return this.http
        .get('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/brands/uuid/'+uuid, {headers:headers})
        .map((response) => {
                let data = response.json();
                if(data.status == 0){
                    var brand = new Brand();
                    brand.parseJson(data.brand);
                    return brand;
                } else {
                    return null;
                }
        })
        .toPromise();
    }

    update(brand: Brand): Promise<any> {
        let self = this;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        var body = JSON.stringify(brand);

        return this.http
        .post('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/brands/update', body, {headers:headers})
        .map((response) => {
            let data = response.json();
            return data;
        })
        .toPromise();
    }

    insert(brand: Brand): Promise<any> {
        let self = this;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        var body = JSON.stringify(brand);

        return this.http
        .post('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/brands/insert', body, {headers:headers})
        .map((response) => {
            let data = response.json();
            return data;
        })
        .toPromise();
    }

    deactive(brand): Promise<any> {
        let self = this;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        var body = JSON.stringify(brand);

        return this.http
        .post('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/brands/deactivate', body, {headers:headers})
        .map((response) => {
            let data = response.json();
            return data;
        })
        .toPromise();
    }

    active(brand): Promise<any> {
        let self = this;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        var body = JSON.stringify(brand);

        return this.http
        .post('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/brands/activate', body, {headers:headers})
        .map((response) => {
            let data = response.json();
            return data;
        })
        .toPromise();
    }
}
