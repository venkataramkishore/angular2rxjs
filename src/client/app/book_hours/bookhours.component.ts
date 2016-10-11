import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';
import {LocalStorageService} from 'ng2-webstorage';
import { Contract } from '../shared/models/index';
import { ContractService } from '../shared/services/index';

/**
 * Book Hours component, as described in Module a base component holds several components
 * 
 * @export
 * @class BookHoursComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
    moduleId: module.id,
    selector: 'book-hours',
    templateUrl: 'bookhours.component.html'
})
export class BookHoursComponent implements OnInit, OnDestroy {

    /**
     * Holds selected contract info
     * 
     * @type {Contract}
     * @memberOf BookHoursComponent
     */
    public selectedContract:Contract;

    /**
     * Creates an instance of BookHoursComponent.
     * 
     * @param {Router} router
     * @param {LocalStorageService} localSt
     * @param {ContractService} contractService
     * 
     * @memberOf BookHoursComponent
     */
    constructor(private router:Router,
                private localSt:LocalStorageService,
                private contractService:ContractService) {
    }

    /**
     * life cycle of ng2 init.
     * 
     * @memberOf BookHoursComponent
     */
    ngOnInit() {
        console.log('Inside BookHoursComponent..');
        this.selectedContract = this.localSt.retrieve('sel-contract');
    }

    /**
     * life cycle of ng2 destroy
     * 
     * @memberOf BookHoursComponent
     */
    ngOnDestroy() {
        this.selectedContract = null;
        //this.localSt.clear('sel-contract');
    }
}
