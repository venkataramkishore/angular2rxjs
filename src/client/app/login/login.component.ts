import { Component, OnInit, OnDestroy } from '@angular/core';
import { User , LoginForm} from '../shared/models/index';
import { Router} from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable }   from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';
import { LoginService } from '../shared/services/index';

/**
 * 
 * 
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
    moduleId: module.id,
    selector: 'login-form',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    /**
     * 
     * 
     * @type {boolean}
     * @memberOf LoginComponent
     */
    public submit:boolean;
    /**
     * 
     * 
     * @type {Observable<User>}
     * @memberOf LoginComponent
     */
    public user$:Observable<User>;
    /**
     * 
     * 
     * @type {LoginForm}
     * @memberOf LoginComponent
     */
    public userForm:LoginForm;
    /**
     * 
     * 
     * @type {Subscription}
     * @memberOf LoginComponent
     */
    public subscription : Subscription;

    /**
     * 
     * 
     * @type {FormGroup}
     * @memberOf LoginComponent
     */
    public validFormGroup:FormGroup;
    /**
     * 
     * 
     * @type {string}
     * @memberOf LoginComponent
     */
    public errorMsg :string;
    /**
     * 
     * 
     * @type {User}
     * @memberOf LoginComponent
     */
    public user:User;

    /**
     * Creates an instance of LoginComponent.
     * 
     * @param {LoginService} loginService
     * @param {FormBuilder} formBuilder
     * @param {Router} router
     * 
     * @memberOf LoginComponent
     */
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

    /**
     * 
     * 
     * 
     * @memberOf LoginComponent
     */
    ngOnInit() {
        this.submit = false;
    }

    /**
     * 
     * 
     * 
     * @memberOf LoginComponent
     */
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

    /**
     * 
     * 
     * 
     * @memberOf LoginComponent
     */
    ngOnDestroy() {
        this.submit = false;
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    /**
     * 
     * 
     * @private
     * @param {User} user
     * 
     * @memberOf LoginComponent
     */
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

    /**
     * 
     * 
     * @private
     * @param {*} error
     * 
     * @memberOf LoginComponent
     */
    private handleLoginOnError(error:any): void {
        this.errorMsg=error.message || error.statusText;
        this.submit = false;
        console.log(error);
    }

    /**
     * 
     * 
     * @private
     * 
     * @memberOf LoginComponent
     */
    private handleLoginOnComplete(): void {
        console.log('Login observable completed');
    }
}
