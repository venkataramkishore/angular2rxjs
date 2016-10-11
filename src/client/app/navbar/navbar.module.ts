import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent }  from './navbar.component';

import { NavbarService } from '../shared/services/navbar/navbar.service';
import { Ng2Webstorage } from 'ng2-webstorage';

@NgModule({
    imports: [ CommonModule, FormsModule, RouterModule, Ng2Webstorage ],
    exports: [ NavbarComponent ],
    declarations: [ NavbarComponent ]
})
export class NavBarModule { }
