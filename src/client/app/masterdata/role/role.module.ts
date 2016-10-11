import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RoleComponent }   from './role.component';
import { RoleService } from '../../shared/services/index';

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule, HttpModule ],
    exports: [ RoleComponent ],
    declarations: [ RoleComponent ],
    providers: [ RoleService ],
})
export class RoleModule { }
