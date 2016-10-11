import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BusinessLineComponent }   from './businessline.component';
import { BusinessLineService } from '../../shared/services/index';

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule, HttpModule ],
    exports: [ BusinessLineComponent ],
    declarations: [ BusinessLineComponent ],
    providers: [ BusinessLineService ],
})
export class BusinessLineModule { }
