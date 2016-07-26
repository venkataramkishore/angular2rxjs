import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {SessionStorageService} from 'ng2-webstorage';

import { URLConfig, User, LoginForm, ResponseData } from '../../models/index';
import { parseResponse, parseUser, AppConstant } from '../../util/index';

/**
 * Login Service: Perform user login and authemtication operations 
 */
@Injectable()
export class LoginService {

    public currUser:User;
    public userForm:LoginForm;
    private user$:Observable<User>;

    constructor(private sessionSt:SessionStorageService,
                private http: Http) {}

    public isAuthenticated() : boolean {
        return !!this.currUser;
    }

    public setUser(user:User):void {
        this.currUser = user;
        this.sessionSt.store('user', this.currUser);
    }

    public getStorageObservable() : Observable<User> {
        return this.sessionSt.observe('user').asObservable();
    }

    authenticateUser(userForm:LoginForm) : Observable<User> {
        console.log('authenticate user service');
        console.log(URLConfig.DEV_HOST_URL+ URLConfig.LOGIN_URL);
        if(!this.isAuthenticated()) {
            this.user$ = this.http.post(URLConfig.DEV_HOST_URL+URLConfig.LOGIN_URL, userForm)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        console.log(response);
                        const res:ResponseData = parseResponse(response);
                        if(res.status === AppConstant.FAILURE) {
                            throw new Error(res.failureResponse);
                        }else {
                           return  parseUser(res.successResponse)
                        }
                    });
        }
        return this.user$;
    }
}
