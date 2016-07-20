import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {SessionStorageService} from 'ng2-webstorage';
//import * as _ from 'lodash';

import { URLConfig } from '../../models/api-url.config';
import { User, UserForm } from '../../models/user.model';
import { parseResponse, parseUser } from '../../util/util.exports';

/**
 * Login Service: Perform user login and authemtication operations 
 */
@Injectable()
export class LoginService {

    public currUser:User;
    public userForm:UserForm;
    private user$:Observable<User>;

    constructor(private localSt:SessionStorageService,
                private http: Http) {}

    public isAuthenticated() : boolean {
        return !!this.currUser;
    }

    public setUser(user:User):void {
        this.currUser = user;
        this.localSt.store('user', this.currUser);
    }

    authenticateUser(userForm:UserForm) : Observable<User> {
        console.log('authenticate user service');
        console.log(URLConfig.HOST_URL+ URLConfig.LOGIN_URL);
        if(!this.isAuthenticated()) {
            this.user$ = this.http.post(URLConfig.HOST_URL+URLConfig.LOGIN_URL, userForm)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        console.log(response);
                        return parseUser(parseResponse(response).successResponse);
                    });
        }
        return this.user$;
    }
}
