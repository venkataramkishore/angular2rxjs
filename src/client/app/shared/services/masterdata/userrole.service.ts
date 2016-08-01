import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Subject}     from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Config} from '../../index';
import {URLConfig, ResponseData, UserRole} from '../../models/index';
import {parseResponse, parseUserRole, AppConstant} from '../../util/index';

/**
 * UserRole Service: CRUD User Roles 
 */
@Injectable()
export class UserRoleService {
    private userRoleSubject$:Subject<UserRole[]> = new ReplaySubject<UserRole[]>(1);
    private userRoles$:Observable<UserRole[]> = this.userRoleSubject$.asObservable();

    constructor(private http: Http) {}

    fetchAllUserRoles() : Observable<UserRole[]> {
        console.log('UserRole service '+Config.API + URLConfig.USER_ROLE.ALL);
            this.http.get(Config.API + URLConfig.USER_ROLE.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseUserRole);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    })
            .subscribe((userRoleList: UserRole[]) => {
                if (_.isArray(userRoleList) && userRoleList.length>0) {
                   this.userRoleSubject$.next(userRoleList);
                }
            },
            this.handleOnError.bind(this));
        return this.userRoles$;
    }
    private handleOnError(error: any): void {
        //this.errorMsg = error.message || error.statusText;
        console.log(error);
    }
}
