import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Subject}     from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Config} from '../../index';
import {URLConfig, ResponseData, Role} from '../../models/index';
import {parseResponse, parseRole, AppConstant} from '../../util/index';

/**
 * Role Service :: CRUD on roles 
 */
@Injectable()
export class RoleService {
    private roleSubject$:Subject<Role[]> = new ReplaySubject<Role[]>(1);
    private role$:Observable<Role[]> = this.roleSubject$.asObservable();

    constructor(private http: Http) {}

    fetchAllRoles() : Observable<Role[]> {
        console.log('Role service '+Config.API + URLConfig.ROLE.ALL);
            this.http.get(Config.API + URLConfig.ROLE.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseRole);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    })
            .subscribe((roleList: Role[]) => {
                if (_.isArray(roleList) && roleList.length>0) {
                   this.roleSubject$.next(roleList);
                }
            },
            this.handleOnError.bind(this));
        return this.role$;
    }
    private handleOnError(error: any): void {
        //this.errorMsg = error.message || error.statusText;
        console.log(error);
    }
}
