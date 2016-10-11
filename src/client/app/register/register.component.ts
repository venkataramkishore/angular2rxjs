import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {validateEmail} from '../shared/form-validator/index';

import {User} from '../shared/models/index';
import {RegisterService} from '../shared/services/index';

@Component({
    moduleId: module.id,
    selector: 'sign-up',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

    public registerForm: FormGroup;
    public user: User;
    public registerUser$:Observable<User>;
    public errorMsg:string;
    private submitted:boolean=false;

    private regSub:Subscription;

    constructor(public registerService:RegisterService,
                private formBuilder: FormBuilder,
                public router:Router) {
        this.user = new User();
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', validateEmail],
            pwdGroup: this.formBuilder.group({
                password: ['', Validators.required],
                confirmPwd: ['', Validators.required]
            }, { validator: this.matchPassword })
        });
        this.submitted = false;
    }

    ngOnDestroy(): void {
        if( this.regSub ) {
            this.regSub.unsubscribe();
        }
    }

    matchPassword(group: FormGroup): any {
        let password = group.controls['password'];
        let confirm = group.controls['confirmPwd'];

        // Don't kick in until user touches both fields   
        if (password.pristine || confirm.pristine) {
            return null;
        }
        // Mark group as touched so we can add invalid class easily
        group.markAsTouched();
        if (password.value === confirm.value) {
            return null;
        }
        return {
            isValid: false
        };
    }

    public onSubmit() :void {
        if(!this.submitted) {
            this.registerUser$ =  this.registerService.registerUser( this.user );
            this.regSub =  this.registerUser$.subscribe(
                                    this.handleLoginOnNext.bind(this),
                                    this.handleLoginOnError.bind(this),
                                    this.handleLoginOnComplete
                                );
            this.submitted = true;
        }
    }

    public handleLoginOnNext(user:User) : void {
        console.log(user);
        if(_.isObject(user)) {
            this.user = user;
            this.submitted = false;
            this.router.navigate(['/signin']);
        }
    }

    public handleLoginOnError(error:any): void {
        this.errorMsg=error.statusText || error.message;
        this.submitted = false;
        console.log(error);
    }

    public handleLoginOnComplete(): void {
        console.log('Registration observable completed');
    }
}
