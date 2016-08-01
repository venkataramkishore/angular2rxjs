import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Subject}     from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Config} from '../../index';
import {URLConfig, ResponseData, BusinessLine} from '../../models/index';
import {parseResponse, parseBusinessLine, AppConstant} from '../../util/index';

/**
 * BusinessLine Service: Fetch all fixed hours for the contract 
 */
@Injectable()
export class BusinessLineService {
    private businessLineSubject$:Subject<BusinessLine[]> = new ReplaySubject<BusinessLine[]>(1);
    private businessLine$:Observable<BusinessLine[]> = this.businessLineSubject$.asObservable();

    constructor(private http: Http) {}

    fetchAllBusinessLines() : Observable<BusinessLine[]> {
        console.log('BusinessLine service '+Config.API + URLConfig.BUSINESS_LINE.ALL);
            this.http.get(Config.API + URLConfig.BUSINESS_LINE.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseBusinessLine);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    })
            .subscribe((businessLineList: BusinessLine[]) => {
                if (_.isArray(businessLineList) && businessLineList.length>0) {
                   this.businessLineSubject$.next(businessLineList);
                }
            },
            this.handleOnError.bind(this));
        return this.businessLine$;
    }
    private handleOnError(error: any): void {
        //this.errorMsg = error.message || error.statusText;
        console.log(error);
    }
}
