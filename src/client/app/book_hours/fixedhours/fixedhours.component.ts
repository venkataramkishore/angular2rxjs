import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { FixedHoursService, ContractService } from '../../shared/services/index';
import { FixedHours, Contract, ContractFixedHours } from '../../shared/models/index';

/**
 * Fixed hours to show available or ability to select the existing fixed hours.
 * Basically fixed hours means the service for the fixed amount of hours.
 * @export
 * @class FixedHoursComponent
 * @implements {OnInit}
 */
@Component({
    moduleId: module.id,
    selector: 'fixed-hours',
    templateUrl: 'fixedhours.component.html'
})
export class FixedHoursComponent implements OnInit {

    /**
     * List of available fixed hours
     * @type {Observable<FixedHours[]>}
     * @memberOf FixedHoursComponent
     */
    public fixedHoursList:Observable<FixedHours[]>;
    /**
     * User selected or existing hours.
     * @type {Observable<FixedHours[]>}
     * @memberOf FixedHoursComponent
     */
    public selectedFixedHours:Observable<FixedHours[]>;
    /**
     * List to show the existing hours 
     * @type {Observable<ContractFixedHours[]>}
     * @memberOf FixedHoursComponent
     */
    public contractFixedHoursList:Observable<ContractFixedHours[]>;

    /**
     * Creates an instance of FixedHoursComponent.
     * @param {ContractService} contractService
     * @param {FixedHoursService} fixedHoursService
     * @memberOf FixedHoursComponent
     */
    constructor(private contractService:ContractService,
                private fixedHoursService:FixedHoursService) {
    }

    /**
     * life cycle of ng 2 before init.
     * @memberOf FixedHoursComponent
     */
    ngOnInit() {
       this.fixedHoursList= this.fixedHoursService.fetchAllFixedHourss();
       this.contractService.getSelectedContract().subscribe(
           (contract: Contract) => {
               this.contractFixedHoursList = this.fixedHoursService.fetchContractFixedHours(contract.contractId.toString());
           }
       );
    }

}
