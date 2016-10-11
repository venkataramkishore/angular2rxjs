import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContractListComponent }   from './contract-list.component';
import { ContractFilterPipe } from './contract.filter.pipe';
import { RouterModule } from '@angular/router';
import { Ng2Webstorage } from 'ng2-webstorage';
import { ContractService } from '../shared/services/contracts/contracts.service';


/**
 * Contracts to show list of contracts available and manage each contract.
 * 
 * @export
 * @class ContractsModule
 */
@NgModule({
    imports: [ CommonModule, FormsModule, HttpModule, RouterModule, Ng2Webstorage],
    exports: [ ContractListComponent, ContractFilterPipe ],
    declarations: [ ContractListComponent, ContractFilterPipe ],
    providers: [ ContractService ],
})
export class ContractsModule { }
