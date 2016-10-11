import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StayComponent }   from './stay.component';
import { StayService } from '../../shared/services/index';

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule, HttpModule ],
    exports: [ StayComponent ],
    declarations: [ StayComponent ],
    providers: [ StayService ],
})
export class StayModule { }
