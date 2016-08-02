import { Component, OnInit, Input } from '@angular/core';
import { Contract } from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'selected-contract',
    templateUrl: 'selectedcontract.component.html'
})
export class SelectedContractComponent implements OnInit {

    @Input()
    public contract:Contract;

    constructor() {
        //TODO::
    }
    ngOnInit() {
        //TODO::
    }
}
