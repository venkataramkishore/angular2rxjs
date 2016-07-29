import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Config} from '../../index';
import {URLConfig, ResponseData, BusinessLine} from '../../models/index';
import {parseResponse, parseBusinessLine, AppConstant} from '../../util/index';

/**
 * BusinessLine Service: Fetch all fixed hours for the contract 
 */
@Injectable()
export class BusinessLineService {

    public businessLine$:Observable<BusinessLine[]>;

    constructor(private http: Http) {}

    fetchAllBusinessLines() : Observable<BusinessLine[]> {
        console.log('BusinessLine service '+Config.API + URLConfig.BUSINESS_LINE.ALL);
            this.businessLine$ = this.http.get(Config.API + URLConfig.BUSINESS_LINE.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseBusinessLine);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    });
        return this.businessLine$;
    }
}
