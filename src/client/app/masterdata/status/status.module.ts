import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StatusComponent }   from './status.component';
import { StatusService } from '../../shared/services/index';

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule, HttpModule ],
    exports: [ StatusComponent ],
    declarations: [ StatusComponent ],
    providers: [ StatusService ],
})
export class StatusModule { }
