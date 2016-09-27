import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class NacionalitiesProvider{

    constructor(private http: Http){

    }

    getAll(): Promise<any> {
        let self = this;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('user_token'));

        return this.http
        .get('http://' + localStorage.getItem('hostAPI') + ':' + localStorage.getItem('portAPI') + '/nacionalities', {headers:headers})
        .map((response) => {
            let data = response.json();
            if(data.status == 0){
                var nacionalities = data.nacionalities;
                return nacionalities;
            } else {
                return null;
            }
        })
        .toPromise();
    }
}
