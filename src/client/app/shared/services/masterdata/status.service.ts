import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Subject}     from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Config} from '../../index';
import {URLConfig, ResponseData, Status} from '../../models/index';
import {parseResponse, parseStatus, AppConstant} from '../../util/index';

/**
 * Status service :: CRUD on status
 */
@Injectable()
export class StatusService {
    private statusSubject$:Subject<Status[]> = new ReplaySubject<Status[]>(1);
    private statuses$:Observable<Status[]> = this.statusSubject$.asObservable();

    constructor(private http: Http) {}

    fetchAllStatus() : Observable<Status[]> {
        console.log('Status service '+Config.API + URLConfig.STATUS.ALL);
            this.http.get(Config.API + URLConfig.STATUS.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseStatus);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    })
            .subscribe((statusList: Status[]) => {
                if (_.isArray(statusList) && statusList.length>0) {
                   this.statusSubject$.next(statusList);
                }
            },
            this.handleOnError.bind(this));
        return this.statuses$;
    }
    private handleOnError(error: any): void {
        //this.errorMsg = error.message || error.statusText;
        console.log(error);
    }
}
