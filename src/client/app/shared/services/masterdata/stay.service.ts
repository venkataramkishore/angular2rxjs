import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Subject}     from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Config} from '../../index';
import {URLConfig, ResponseData, Stay} from '../../models/index';
import {parseResponse, parseStay, AppConstant} from '../../util/index';

/**
 * Stay service :: CRUD stay
 */
@Injectable()
export class StayService {
    private staySubject$:Subject<Stay[]> = new ReplaySubject<Stay[]>(1);
    private stays$:Observable<Stay[]> = this.staySubject$.asObservable();

    constructor(private http: Http) {}

    fetchAllStays() : Observable<Stay[]> {
        console.log('Stay service '+Config.API + URLConfig.STAY_TYPE.ALL);
            this.http.get(Config.API + URLConfig.STAY_TYPE.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseStay);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    })
            .subscribe((stayList: Stay[]) => {
                if (_.isArray(stayList) && stayList.length>0) {
                   this.staySubject$.next(stayList);
                }
            },
            this.handleOnError.bind(this));
        return this.stays$;
    }
    private handleOnError(error: any): void {
        //this.errorMsg = error.message || error.statusText;
        console.log(error);
    }
}
