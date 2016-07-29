import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import {User, ResponseData, URLConfig} from '../../models/index';
import {parseResponse, parseUser, AppConstant} from '../../util/index';
import {Config} from '../../index';

/**
 * Register Service: Perform user registration to access application. 
 */
@Injectable()
export class RegisterService {

    private registerUser$:Observable<User>;

    constructor(private http: Http) {}

    registerUser(userForm:User) : Observable<User> {
        console.log('register user service');
        console.log(Config.API + URLConfig.REGISTER_URL);
            this.registerUser$ = this.http.post(Config.API + URLConfig.REGISTER_URL, userForm)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseUser);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    });
        return this.registerUser$;
    }
}
