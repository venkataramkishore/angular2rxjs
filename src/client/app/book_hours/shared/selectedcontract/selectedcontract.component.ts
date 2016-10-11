import { Component, OnInit, Input } from '@angular/core';
import { Contract } from '../../../shared/models/index';

/**
 * Diplay selected contract
 * @export
 * @class SelectedContractComponent
 * @implements {OnInit}
 */
@Component({
    moduleId: module.id,
    selector: 'selected-contract',
    templateUrl: 'selectedcontract.component.html'
})
export class SelectedContractComponent implements OnInit {

    /**
     * Input from parent for the selected resource
     * @type {Contract}
     * @memberOf SelectedContractComponent
     */
    @Input()
    public contract:Contract;

    /**
     * Creates an instance of SelectedContractComponent.
     * @memberOf SelectedContractComponent
     */
    constructor() {
        //TODO::
    }
    /**
     * Life cycle of ng2 before init 
     * @memberOf SelectedContractComponent
     */
    ngOnInit() {
        //TODO::
    }
}
