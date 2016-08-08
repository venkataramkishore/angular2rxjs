import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { FixedHoursService, ContractService } from '../../shared/services/index';
import { FixedHours, Contract, ContractFixedHours } from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'fixed-hours',
    templateUrl: 'fixedhours.component.html',
    providers: [FixedHoursService]
})
export class FixedHoursComponent implements OnInit {

    public fixedHoursList:Observable<FixedHours[]>;
    public selectedFixedHours:Observable<FixedHours[]>;
    public contractFixedHoursList:Observable<ContractFixedHours[]>;

    constructor(private fixedHoursService:FixedHoursService,
                private contractService:ContractService) {
    }

    ngOnInit() {
       this.fixedHoursList= this.fixedHoursService.fetchAllFixedHourss();
       this.contractService.getSelectedContract().subscribe(
           (contract: Contract) => {
               this.contractFixedHoursList = this.fixedHoursService.fetchContractFixedHours(contract.contractId.toString());
           }
       );
    }

}
