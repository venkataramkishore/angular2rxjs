import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Subject}     from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Config} from '../../index';
import {URLConfig, ResponseData, FixedHours} from '../../models/index';
import {parseResponse, parseFixedHours, AppConstant} from '../../util/index';

/**
 * FixedHours Service: Fetch all fixed hours for the contract 
 */
@Injectable()
export class FixedHoursService {
    private fixedHoursSubject$:Subject<FixedHours[]> = new ReplaySubject<FixedHours[]>(1);
    private fixedHours$:Observable<FixedHours[]> = this.fixedHoursSubject$.asObservable();

    constructor(private http: Http) {}

    fetchAllFixedHourss() : Observable<FixedHours[]> {
        console.log('FixedHours service '+Config.API + URLConfig.FIXED_HOURS.ALL);
            this.http.get(Config.API + URLConfig.FIXED_HOURS.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseFixedHours);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    })
            .subscribe((fixedHoursList: FixedHours[]) => {
                if (_.isArray(fixedHoursList) && fixedHoursList.length>0) {
                   this.fixedHoursSubject$.next(fixedHoursList);
                }
            },
            this.handleOnError.bind(this));
        return this.fixedHours$;
    }
    private handleOnError(error: any): void {
        //this.errorMsg = error.message || error.statusText;
        console.log(error);
    }
}
