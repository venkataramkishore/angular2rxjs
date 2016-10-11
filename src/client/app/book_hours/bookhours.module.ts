import { NgModule } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { Ng2Webstorage } from 'ng2-webstorage';
import { ContractsModule } from '../contracts/index';
import { BookHoursComponent, AMHoursComponent, KTHoursComponent, FixedHoursComponent }   from './index';
import { SelectedContractComponent, OffshoreTableComponent, OnshoreTableComponent, ResourceFormComponent } from './shared/index';
import { CurrencyFormatPipe } from '../shared/index';
import { /*ContractService,*/ FixedHoursService } from '../shared/services/index';

/**
 * Book Hours module.
 * Used to book hours for the contract based on resource criteria.
 * This includes several components like OnshoreTableComponent, OffshoreTableComponent, SelectedContractComponent, ResourceFormComponent
 * @export BookHoursComponent, AMHoursComponent, KTHoursComponent, FixedHoursComponent,
                SelectedContractComponent, OffshoreTableComponent,
                    OnshoreTableComponent, ResourceFormComponent, CurrencyFormatPipe
 * @class BookHoursModule
 */
@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, HttpModule, Ng2Webstorage, ContractsModule ],
    exports: [ BookHoursComponent, AMHoursComponent, KTHoursComponent, FixedHoursComponent,
                SelectedContractComponent, OffshoreTableComponent,
                    OnshoreTableComponent, ResourceFormComponent, CurrencyFormatPipe],
    declarations: [BookHoursComponent, AMHoursComponent, KTHoursComponent,
                    FixedHoursComponent, SelectedContractComponent, OffshoreTableComponent,
                    OnshoreTableComponent, ResourceFormComponent, CurrencyFormatPipe],
    providers: [ FixedHoursService ],
})
export class BookHoursModule { }
