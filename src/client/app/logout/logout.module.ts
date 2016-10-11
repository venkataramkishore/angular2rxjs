import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LogoutComponent }   from './logout.component';
import { Ng2Webstorage } from 'ng2-webstorage';

/**
 * Logout module to manage user logout flow.
 * @export
 * @class LogoutModule
 */
@NgModule({
    imports: [ CommonModule, RouterModule, Ng2Webstorage ],
    exports: [ LogoutComponent ],
    declarations: [ LogoutComponent ]
})
export class LogoutModule { }
