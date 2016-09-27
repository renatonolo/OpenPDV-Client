import { Component, OnInit } from '@angular/core';
import { Router, RouteSegment } from '@angular/router';
import { Control, Validators, ControlGroup, FormBuilder, FORM_DIRECTIVES } from '@angular/common';

import { MoneyPipe } from '../../utils/money.pipe';

import { Sale } from '../../models/sale';
import { Product } from '../../models/product';

import { SalesProvider } from '../../providers/sales';
import { ProductsProvider } from '../../providers/products';

@Component({
    selector: 'saleNew',
    templateUrl: 'views/saleNew.html',
    pipes: [MoneyPipe],
    providers: [SalesProvider, ProductsProvider],
    directives: [FORM_DIRECTIVES],
    styleUrls: ['styles/form.css']
})

export class SaleNewComponent {
    sale: Sale;
    productsSearch: Product[];
    selectedProduct: Product;
    saleForm: ControlGroup;
    formError: string = "";
    card: string = "";
    sellProduct: string[] = [];
    sellPrice: number[] = [];
    installmentArr = Array(1);
    totalPrice: number = 0;
    moneyValue: number = 0;
    debitValue: number = 0;
    change: number = 0;
    eachInstallment: number = 0;
    installmentNum: number = 1;
    endSale: boolean = false;
    moneyPayment: boolean = false;
    debitPayment: boolean = false;
    installmentPayment: boolean = false;
    error: String = "";

    constructor(
        private salesProvider: SalesProvider,
        private productsProvider: ProductsProvider,
        private router: Router,
        private segment: RouteSegment,
        private fb: FormBuilder
    ){ }

    ngOnInit(){
        this.productsSearch = [];
    }

    getProduct(product){
        if(product.length < 2) {
            this.productsSearch = [];
            return;
        }
        if(isNaN(product)){
            console.log("Pesquisar por nome")
            var prod = this.productsProvider.getByName(product);
            prod.then((data: Product[]) => {
                var prod = [];
                data.forEach(function(p){
                    if(p.stock <= 0) p.brand.name += " - 0 em estoque!";
                    prod.push(p);
                });
                this.productsSearch = prod;
            }).catch(err => {
                this.productsSearch = [];
                console.log("Error: " + err);
            });
        } else {
            console.log("Pesquisar por barcode");
            var prod = this.productsProvider.getByBarCode(product);
            prod.then((data: Product[]) => {
                var prod = [];
                data.forEach(function(p){
                    if(p.stock <= 0) p.brand.name += " - 0 em estoque!";
                    prod.push(p);
                });
                this.productsSearch = prod;
            }).catch(err => {
                this.productsSearch = [];
                console.log("Error: " + err);
            });
        }
    }

    selectProduct(product){
        this.productsSearch = [];
        this.selectedProduct = product;
    }

    addProduct(amount){
        if(amount > this.selectedProduct.stock){
            this.error = "Você tem apenas " + this.selectedProduct.stock + " no estoque.";
            return;
        } else this.error = "";
        if(!this.sale) {
            this.sale = new Sale();
            this.sale.products = new Array<Product>();
            this.sale.amount = new Array<number>();
            this.sale.values = new Array<number>();
        }
        this.sale.products.push(this.selectedProduct);
        this.sale.amount.push(amount);
        this.sale.values.push(amount * this.selectedProduct.sellPrice);

        this.totalPrice = 0;
        for(var i = 0; i < this.sale.values.length; i++){
            this.totalPrice += this.sale.values[i];
        }

        this.selectedProduct = null;
    }

    removeItem(i){
        var saleAux:Sale = this.sale;

        this.sale = new Sale();
        this.sale.products = new Array<Product>();
        this.sale.amount = new Array<number>();
        this.sale.values = new Array<number>();

        for(var c = 0; c < saleAux.products.length; c++){
            if(c != i){
                this.sale.products.push(saleAux.products[c]);
                this.sale.amount.push(saleAux.amount[c]);
                this.sale.values.push(saleAux.values[c]);
            }
        }

        this.totalPrice = 0;
        for(c = 0; c < this.sale.values.length; c++){
            this.totalPrice += this.sale.values[c];
        }
    }

    finishSale(saleOff){
        if(this.sale.products.length == 0) return;
        saleOff = saleOff.toString().replace(",", ".");
        if(!isNaN(saleOff)) this.sale.saleOff = saleOff;

        var products = new Array<any>();
        for(var i = 0; i < this.sale.products.length; i++){
            products[i] = {};
            products[i].uuid = this.sale.products[i].uuid;
            products[i].amount = this.sale.amount[i];
            products[i].productOff = 0;
        }

        var sell = this.salesProvider.new(products, saleOff);
        sell.then((data: any) => {
            if(data.status == 0) {
                this.sale.uuid = data.uuid;
                this.endSale = true;
            } else this.endSale = false;
        }).catch(err => {
            this.endSale = false;
            console.log("Error: " + err);
        });
    }

    choosePayment(type){
        if(type == 0) this.moneyPayment = true;
        else if(type == 1) this.debitPayment = true;
        else if(type == 2) {
            this.installmentArr[0] = this.totalPrice - this.sale.saleOff;
            this.installmentPayment = true;
            this.eachInstallment = this.totalPrice - this.sale.saleOff;
        }
    }

    chooseCard(card){
        this.card = card;
    }

    addMoneyPayment(value){
        if(isNaN(value)) return;
        this.moneyValue = value;
        this.change = this.moneyValue - (this.totalPrice - this.sale.saleOff);
    }

    addDebitPayment(value){
        if(isNaN(value)) return;
        this.debitValue = value;
        this.change = (this.totalPrice - this.sale.saleOff) - this.debitValue;
    }

    finishMoneyPayment(value){
        var payment = {'value': value};
        var pay = this.salesProvider.addPayment(this.sale.uuid, 0, payment);
        pay.then((data: any) => {
            if(data.status == 0){
                if((this.totalPrice - this.sale.saleOff - value) == 0) this.router.navigate(['/system/home']);
                else {
                    this.totalPrice = this.totalPrice - value;
                    this.moneyPayment = false;
                }
            } else console.log("Error: " + data.message);
        }).catch(err => {
            console.log("Error: " + err);
        });
    }

    finishDebitPayment(value){
        if(this.card == "") return;
        var payment = {'value': value, 'card': this.card};
        var pay = this.salesProvider.addPayment(this.sale.uuid, 1, payment);
        pay.then((data: any) => {
            console.log(data);
            if(data.status == 0){
                if((this.totalPrice - this.sale.saleOff - value) == 0) this.router.navigate(['/system/home']);
                else {
                    this.totalPrice = this.totalPrice - value;
                    this.debitPayment = false;
                }
            } else console.log("Error: " + data.message);
        }).catch(err => {
            console.log("Error: " + err);
        });
    }

    finishInstallmentPayment(){
        //console.log(txtInstallmentValue.value);
    }

    addInstallmentNum(){
        this.installmentNum++;
        this.eachInstallment = (this.totalPrice - this.sale.saleOff) / this.installmentNum;
        this.installmentArr = new Array(this.installmentNum);
        for(var i = 0; i < this.installmentArr.length; i++){
            this.installmentArr[i] = this.eachInstallment;
        }
    }

    updateInstallment(value, i){
        if(isNaN(value)) return;
        this.installmentArr[i] = value;
        /*var tot: number = 0;
        for(var j = 0; j < this.installmentArr.length; j++){
            tot += this.installmentArr[j];
        }
        this.change = this.totalPrice - this.sale.saleOff - tot;*/
    }

    back(){
        this.router.navigate(['/system/home']);
    }
}
