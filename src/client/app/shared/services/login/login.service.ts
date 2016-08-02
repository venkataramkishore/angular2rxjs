import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {SessionStorageService} from 'ng2-webstorage';
import * as _ from 'lodash';

import { URLConfig, User, LoginForm, ResponseData } from '../../models/index';
import { parseResponse, parseUser, AppConstant } from '../../util/index';
import {Config} from '../../index';

/**
 * Login Service: Perform user login and authemtication operations 
 */
@Injectable()
export class LoginService {

    public currUser: User;
    public userForm: LoginForm;
    private user$: Observable<User>;

    constructor(private sessionSt: SessionStorageService,
        private http: Http) {}

    public isAuthenticated(): boolean {
        return !!this.currUser;
    }

    public setUser(user: User): void {
        this.currUser = user;
        this.sessionSt.store('user', this.currUser);
    }

    authenticateUser(userForm: LoginForm): Observable<User> {
        console.log('authenticate user service');
        console.log(Config.API + URLConfig.LOGIN_URL);
        if (!this.isAuthenticated()) {
            this.user$ = this.http.post(Config.API + URLConfig.LOGIN_URL, userForm)
                .map((response: Response) => <any>response.json())
                .map((response: any) => {
                    let responseData: ResponseData = parseResponse(response);
                    if (_.isEqual(responseData.status, AppConstant.SUCCESS)) {
                        return parseUser(responseData.successResponse);
                    } else if (_.isEqual(responseData.status, AppConstant.FAILURE)) {
                        throw new Error(responseData.failureResponse);
                    }
                    return null;
                });
        }
        return this.user$;
    }
}
