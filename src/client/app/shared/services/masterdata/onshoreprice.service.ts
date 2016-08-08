import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import { Subject }     from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Config } from '../../index';
import { URLConfig, ResponseData, OnshorePrice, Resource } from '../../models/index';
import { parseResponse, parseOnshorePrice, AppConstant } from '../../util/index';
/**
 * Onshore Price service :: fetch price list for the respective criteria
 */
@Injectable()
export class OnshoreService {
    private onshorePriceSubject$:Subject<OnshorePrice[]> = new ReplaySubject<OnshorePrice[]>(1);
    private onshorePrice$:Observable<OnshorePrice[]> = this.onshorePriceSubject$.asObservable();
    private _onShorePrice:Observable<OnshorePrice>;

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
    fetchPrice(resource:Resource):Observable<OnshorePrice> {

        let url = Config.API + URLConfig.ONSHORE_PRICE.FIND_PRICE.replace(AppConstant.p_bl, resource.businessLine.businesslineId);
        url = url.replace(AppConstant.p_ro, resource.role.roleId.toString());
        url = url.replace(AppConstant.p_g, resource.grade.gradeId.toString());

        this._onShorePrice = this.http.get(url)
                    .map((response:Response) => <any>response.json())
                    .map((response:Response) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return parseOnshorePrice(responseData.successResponse);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                        return null;
                    });
        return this._onShorePrice;
    }

    private handleOnError(error: any): void {
        //this.errorMsg = error.message || error.statusText;
        console.log(error);
    }
}
