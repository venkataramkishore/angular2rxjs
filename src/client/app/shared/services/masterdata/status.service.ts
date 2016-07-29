import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Config} from '../../index';
import {URLConfig, ResponseData, Status} from '../../models/index';
import {parseResponse, parseStatus, AppConstant} from '../../util/index';

/**
 * ResourceType Service: Fetch all resourcetypes used in project 
 */
@Injectable()
export class StatusService {

    public statuses$:Observable<Status[]>;

    constructor(private http: Http) {}

    fetchAllStatus() : Observable<Status[]> {
        console.log('Status service '+Config.API + URLConfig.STATUS.ALL);
            this.statuses$ = this.http.get(Config.API + URLConfig.STATUS.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseStatus);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    });
        return this.statuses$;
    }
}
