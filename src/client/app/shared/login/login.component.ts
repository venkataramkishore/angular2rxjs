import { Component, OnInit, OnDestroy } from '@angular/core';
import { User , LoginForm} from '../models/index';
import { ROUTER_DIRECTIVES , Router} from '@angular/router';

import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {EmailValidatorDirective} from '../form-validator/index';

import { Observable }   from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';
import { LoginService } from '../services/index';

@Component({
    moduleId: module.id,
    selector: 'login-form',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, EmailValidatorDirective]
})
export class LoginComponent implements OnInit, OnDestroy {

    public submit:boolean;
    public user$:Observable<User>;
    public userForm:LoginForm;
    public subscription : Subscription;

    public validFormGroup:FormGroup;
    public errorMsg :string;
    public user:User;

    constructor(public loginService:LoginService,
                private formBuilder: FormBuilder,
                public router:Router) {
        this.userForm = new LoginForm();

        //model driven form validation
        this.validFormGroup = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.submit = false;
    }

    public onSubmit(): void {
        console.log('onSubmit');
        if(!this.submit) {
            this.user$ =  this.loginService.authenticateUser( this.userForm );
            this.subscription =  this.user$.subscribe(
                                    this.handleLoginOnNext.bind(this),
                                    this.handleLoginOnError.bind(this),
                                    this.handleLoginOnComplete
                                );
        }
        this.submit = true;
    }

    ngOnDestroy() {
        this.submit = false;
        if(this.subscription && !this.subscription.isUnsubscribed) {
            this.subscription.unsubscribe();
        }
    }

    private handleLoginOnNext(user:User) : void {
        console.log(user);
        if(_.isObject(user)) {
            this.user = user;
            this.loginService.setUser(this.user);
            this.router.navigate(['/contracts']);
        }else {
            this.errorMsg='Please provide valid credentials.';
        }
        this.submit = false;
    }

    private handleLoginOnError(error:any): void {
        this.errorMsg=error.message || error.statusText;
        this.submit = false;
        console.log(error);
    }

    private handleLoginOnComplete(): void {
        console.log('Login observable completed');
    }
}
