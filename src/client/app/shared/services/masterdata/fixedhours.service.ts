import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Subject}     from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Config} from '../../index';
import {URLConfig, ResponseData, FixedHours, ContractFixedHours} from '../../models/index';
import {parseResponse, parseFixedHours, parseContractFixedHours, AppConstant} from '../../util/index';

/**
 * FixedHours Service: Fetch all fixed hours for the contract 
 */
@Injectable()
export class FixedHoursService {
    private fixedHoursSubject$:Subject<FixedHours[]> = new ReplaySubject<FixedHours[]>(1);
    private fixedHours$:Observable<FixedHours[]> = this.fixedHoursSubject$.asObservable();

    private contractFixedHoursSubject$:Subject<ContractFixedHours[]> = new ReplaySubject<ContractFixedHours[]>(1);
    private contractFixedHours$:Observable<ContractFixedHours[]> = this.contractFixedHoursSubject$.asObservable();

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

    fetchContractFixedHours(contractId:string):Observable<ContractFixedHours[]> {

        let url = URLConfig.FIXED_HOURS.CONTRACT_FIXED_HOURS.replace(AppConstant.p_fc, contractId);
        console.log('Contract FixedHours service '+Config.API + url);
            this.http.get(Config.API + url)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseContractFixedHours);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    })
            .subscribe((contractFixedHoursList: ContractFixedHours[]) => {
                if (_.isArray(contractFixedHoursList) && contractFixedHoursList.length>0) {
                   this.contractFixedHoursSubject$.next(contractFixedHoursList);
                }
            },
            this.handleOnError.bind(this));
        return this.contractFixedHours$;
    }
    private handleOnError(error: any): void {
        //this.errorMsg = error.message || error.statusText;
        console.log(error);
    }
}
