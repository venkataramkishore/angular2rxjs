import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UserRoleComponent }   from './userrole.component';
import { UserRoleService } from '../../shared/services/index';

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule, HttpModule ],
    exports: [ UserRoleComponent ],
    declarations: [ UserRoleComponent ],
    providers: [ UserRoleService ],
})
export class UserRoleModule { }
