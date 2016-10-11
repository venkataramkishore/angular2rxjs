import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BandComponent }   from './band.component';
import { BandService } from '../../shared/services/index';
//import { BandRoutes } from './band.routes';

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule, HttpModule ],
    exports: [ BandComponent ],
    declarations: [ BandComponent ],
    providers: [ BandService ],
})
export class BandModule { }
