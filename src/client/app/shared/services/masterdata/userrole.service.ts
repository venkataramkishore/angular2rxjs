import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Config} from '../../index';
import {URLConfig, ResponseData, UserRole} from '../../models/index';
import {parseResponse, parseUserRole, AppConstant} from '../../util/index';

/**
 * ResourceType Service: Fetch all resourcetypes used in project 
 */
@Injectable()
export class UserRoleService {

    public userRoles$:Observable<UserRole[]>;

    constructor(private http: Http) {}

    fetchAllUserRoles() : Observable<UserRole[]> {
        console.log('UserRole service '+Config.API + URLConfig.USER_ROLE.ALL);
            this.userRoles$ = this.http.get(Config.API + URLConfig.USER_ROLE.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseUserRole);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    });
        return this.userRoles$;
    }
}
