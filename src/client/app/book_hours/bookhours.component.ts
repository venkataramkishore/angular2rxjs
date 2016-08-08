import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES , Router} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import {LocalStorageService} from 'ng2-webstorage';

import { Contract } from '../shared/models/index';
import { SelectedContractComponent } from './shared/selectedcontract/index';
import { ContractService } from '../shared/services/index';

@Component({
    moduleId: module.id,
    selector: 'book-hours',
    templateUrl: 'bookhours.component.html',
    directives:[ROUTER_DIRECTIVES, SelectedContractComponent]
})
export class BookHoursComponent implements OnInit, OnDestroy {

    public selectedContract:Contract;

    constructor(private router:Router,
                private localSt:LocalStorageService,
                private contractService:ContractService) {
    }

    ngOnInit() {
        console.log('Inside BookHoursComponent..');
        this.selectedContract = this.localSt.retrieve('sel-contract');
    }

    ngOnDestroy() {
        this.selectedContract = null;
        //this.localSt.clear('sel-contract');
    }
}
