import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SkillComponent }   from './skill.component';
import { SkillService } from '../../shared/services/index';

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule, HttpModule ],
    exports: [ SkillComponent ],
    declarations: [ SkillComponent ],
    providers: [ SkillService ],
})
export class SkillModule { }
