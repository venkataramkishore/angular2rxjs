import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Config} from '../../index';
import {URLConfig, ResponseData, Role} from '../../models/index';
import {parseResponse, parseRole, AppConstant} from '../../util/index';

/**
 * ResourceType Service: Fetch all resourcetypes used in project 
 */
@Injectable()
export class RoleService {

    public role$:Observable<Role[]>;

    constructor(private http: Http) {}

    fetchAllRoles() : Observable<Role[]> {
        console.log('Role service '+Config.API + URLConfig.ROLE.ALL);
            this.role$ = this.http.get(Config.API + URLConfig.ROLE.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseRole);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    });
        return this.role$;
    }
}
