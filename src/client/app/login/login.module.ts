import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { LoginComponent }   from './login.component';
import { EmailValidatorDirective } from '../shared/form-validator/index';
import { Ng2Webstorage } from 'ng2-webstorage';
import { LoginService } from '../shared/services/index';

/**
 * Login Module for user authentication and authorization.
 * @export
 * @class LoginModule
 */
@NgModule({
    imports: [ CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpModule, Ng2Webstorage ],
    exports: [ LoginComponent ],
    declarations: [ LoginComponent, EmailValidatorDirective ],
    providers: [ LoginService ]
})
export class LoginModule { }
