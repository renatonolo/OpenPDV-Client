import { Component } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { SalesReportComponent } from './salesReport';

@Component({
    selector: 'reports',
    templateUrl: 'views/reports.html',
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
    {path: '/sales', component: SalesReportComponent},
    {path: '*', component: SalesReportComponent}
])

export class ReportsComponent {
    constructor(private router: Router){ }
}
