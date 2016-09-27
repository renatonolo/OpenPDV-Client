import { Component, OnInit } from '@angular/core';
import { Router, RouteSegment } from '@angular/router';
import { Control, Validators, ControlGroup, FormBuilder, FORM_DIRECTIVES } from '@angular/common';

import { MoneyPipe } from '../../utils/money.pipe';

import { Sale } from '../../models/sale';

import { ReportsProvider } from '../../providers/reports';
import { SalesProvider } from '../../providers/sales';

@Component({
    selector: 'salesReport',
    templateUrl: 'views/salesReport.html',
    pipes: [MoneyPipe],
    providers: [ReportsProvider, SalesProvider],
    directives: [FORM_DIRECTIVES],
    styleUrls: ['styles/form.css']
})

export class SalesReportComponent {
    sales: any[];
    showDetails: boolean = false;
    sale: any[] = null;
    page: number = 0;
    start: string = "";
    end: string = "";

    constructor(
        private reportsProvider: ReportsProvider,
        private salesProvider: SalesProvider,
        private router: Router,
        private segment: RouteSegment,
        private fb: FormBuilder
    ){ }

    ngOnInit(){

    }

    maskDate(txt){
        var patt = new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}");

        if(txt.value.length == 2) txt.value += "/";
        else if(txt.value.length == 5) txt.value += "/";
        else if(txt.value.length > 10) txt.value = txt.value.substr(0, 10);

        if(patt.test(txt.value)) txt.className = "form-control ng-valid";
        else txt.className = "form-control ng-invalid";
    }

    doReport(start, end){
        this.start = start.value;
        this.end = end.value;
        var patt = new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}");

        if(start.value.length > 10) {
            start.className = "form-control ng-invalid";
            return;
        }
        if(end.value.length > 10) {
            end.className = "form-control ng-invalid";
            return;
        }

        this.getReport();
    }

    getReport(){
        if(!this.page) this.page = 0;

        var sAux = this.start.split('/');
        var eAux = this.end.split('/');

        var s = sAux[2] + "-" + sAux[1] + "-" + sAux[0];
        var e = eAux[2] + "-" + eAux[1] + "-" + eAux[0];

        var report = this.reportsProvider.salesReport(s, e, this.page);
        report.then((data: any) => {
            this.sales = data.sales;
        }).catch(err => {
            //this.loginError = "Error: " + err;
            console.log("Error: " + err);
        });
    }

    showSale(uuid){
        this.showDetails = true;
        var sale = this.salesProvider.details(uuid);
        sale.then((data: any) => {
            if(data.status == 0) this.sale = data.sale;
            else this.sale = null;
        }).catch(err => {
            console.log("Error: " + err);
        });
    }

    hideSale(){
        this.showDetails = false;
        this.sale = null;
    }

    previousPage(){
        this.page--;
        if(this.page < 0) this.page = 0;
        this.getReport();
    }

    nextPage(){
        this.page++;
        this.getReport();
    }

    back(){
        this.router.navigate(['/system/home']);
    }
}
