import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { OnshorePriceComponent }   from './onshoreprice.component';
import { OnshoreService } from '../../shared/services/index';

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule, HttpModule ],
    exports: [ OnshorePriceComponent ],
    declarations: [ OnshorePriceComponent ],
    providers: [ OnshoreService ],
})
export class OnshorePriceModule { }
