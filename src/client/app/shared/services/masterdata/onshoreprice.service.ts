import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Subject}     from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Config} from '../../index';
import {URLConfig, ResponseData, OnshorePrice} from '../../models/index';
import {parseResponse, parseOnshorePrice, AppConstant} from '../../util/index';

/**
 * Onshore Price service :: fetch price list for the respective criteria
 */
@Injectable()
export class OnshoreService {
    private onshorePriceSubject$:Subject<OnshorePrice[]> = new ReplaySubject<OnshorePrice[]>(1);
    private onshorePrice$:Observable<OnshorePrice[]> = this.onshorePriceSubject$.asObservable();

    constructor(private http: Http) {}

    fetchAllOnshorePrices() : Observable<OnshorePrice[]> {
        console.log('OnshorePrice service '+Config.API + URLConfig.ONSHORE_PRICE.ALL);
           this.http.get(Config.API + URLConfig.ONSHORE_PRICE.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseOnshorePrice);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    })
            .subscribe((onshorePriceList: OnshorePrice[]) => {
                if (_.isArray(onshorePriceList) && onshorePriceList.length>0) {
                   this.onshorePriceSubject$.next(onshorePriceList);
                }
            },
            this.handleOnError.bind(this));
        return this.onshorePrice$;
    }
    private handleOnError(error: any): void {
        //this.errorMsg = error.message || error.statusText;
        console.log(error);
    }
}
