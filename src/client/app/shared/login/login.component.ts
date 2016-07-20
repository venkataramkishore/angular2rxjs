import { Component, OnInit, OnDestroy } from '@angular/core';
import { User , UserForm} from '../models/index';
import { ROUTER_DIRECTIVES , Router} from '@angular/router';

import { Observable }   from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';
import { LoginService } from '../services/index';

@Component({
    moduleId: module.id,
    selector: 'login-form',
    templateUrl: 'login.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class LoginComponent implements OnInit, OnDestroy {

    public submit:boolean;
    public user$:Observable<User>;
    public userForm:UserForm;
    public subscription : Subscription;

    public user:User;

    constructor(public loginService:LoginService,
                public router:Router) {
        this.userForm = new UserForm();
    }

    ngOnInit() {
        this.submit = false;
    }

    public onSubmit(): void {
        console.log('onSubmit');
        this.user$ =  this.loginService.authenticateUser( this.userForm );
        this.subscription =  this.user$.subscribe(
                                    this.handleLoginOnNext.bind(this),
                                    this.handleLoginOnError,
                                    this.handleLoginOnComplete
                                );
        this.submit = true;
    }

    ngOnDestroy() {
        if(this.subscription && !this.subscription.isUnsubscribed){
            this.subscription.unsubscribe();
        }
    }

    private handleLoginOnNext(user:User) : void {
        console.log(user);
        if(_.isObject(user)) {
            this.user = user;
            this.loginService.setUser(this.user);
            this.router.navigate(['/contracts']);
        }
    }

    private handleLoginOnError(error:any): void {
        console.log(error);
    }
    private handleLoginOnComplete(): void {
        console.log('Login observable completed');
    }
}
