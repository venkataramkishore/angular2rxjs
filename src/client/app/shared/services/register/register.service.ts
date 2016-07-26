import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import {User, ResponseData, URLConfig} from '../../models/index';
import {parseResponse, parseUser, AppConstant} from '../../util/index';

/**
 * Register Service: Perform user registration to access application. 
 */
@Injectable()
export class RegisterService {

    private registerUser$:Observable<User>;

    constructor(private http: Http) {}

    registerUser(userForm:User) : Observable<User> {
        console.log('register user service');
        console.log(URLConfig.DEV_HOST_URL+ URLConfig.REGISTER_URL);
            this.registerUser$ = this.http.post(URLConfig.DEV_HOST_URL+URLConfig.REGISTER_URL, userForm)
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
        return this.registerUser$;
    }
}
