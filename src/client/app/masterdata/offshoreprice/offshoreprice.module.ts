import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { OffshorePriceComponent }   from './offshoreprice.component';
import { OffshoreService } from '../../shared/services/index';

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule, HttpModule ],
    exports: [ OffshorePriceComponent ],
    declarations: [ OffshorePriceComponent ],
    providers: [ OffshoreService ],
})
export class OffshorePriceModule { }
