import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Subject}     from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Config} from '../../index';
import {URLConfig, ResponseData, OffshorePrice, Resource} from '../../models/index';
import {parseResponse, parseOffshorePrice, AppConstant} from '../../util/index';
/**
 * ResourceType Service: Fetch all resourcetypes used in project 
 */
@Injectable()
export class OffshoreService {
    private offshorePriceSubject$:Subject<OffshorePrice[]> = new ReplaySubject<OffshorePrice[]>(1);
    private offshorePrice$:Observable<OffshorePrice[]> = this.offshorePriceSubject$.asObservable();
    private _offShorePrice:Observable<OffshorePrice>;
    constructor(private http: Http) {}

    fetchAllOffshorePrices() : Observable<OffshorePrice[]> {
        console.log('OffshorePrice service '+Config.API + URLConfig.OFFSHORE_PRICE.ALL);
            this.http.get(Config.API + URLConfig.OFFSHORE_PRICE.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseOffshorePrice);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    })
            .subscribe((offshorePriceList: OffshorePrice[]) => {
                if (_.isArray(offshorePriceList) && offshorePriceList.length>0) {
                   this.offshorePriceSubject$.next(offshorePriceList);
                }
            },
            this.handleOnError.bind(this));
        return this.offshorePrice$;
    }

    fetchPrice(resource:Resource):Observable<OffshorePrice> {

        let url = Config.API + URLConfig.OFFSHORE_PRICE.FIND_PRICE.replace(AppConstant.p_bl, resource.businessLine.businesslineId);
        url = url.replace(AppConstant.p_b, resource.band.bandId.toString());
        url = url.replace(AppConstant.p_st, resource.stayType.stayTypeId.toString());

        this._offShorePrice = this.http.get(url)
                    .map((response:Response) => <any>response.json())
                    .map((response:Response) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return parseOffshorePrice(responseData.successResponse);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                        return null;
                    });
        return this._offShorePrice;
    }

    private handleOnError(error: any): void {
        //this.errorMsg = error.message || error.statusText;
        console.log(error);
    }
}
