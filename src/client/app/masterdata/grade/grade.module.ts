import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { GradeComponent }   from './grade.component';
import { GradeService } from '../../shared/services/index';

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule, HttpModule ],
    exports: [ GradeComponent ],
    declarations: [ GradeComponent ],
    providers: [ GradeService ],
})
export class GradeModule { }
