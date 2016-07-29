import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Config} from '../../index';
import {URLConfig, ResponseData, OnshorePrice} from '../../models/index';
import {parseResponse, parseOnshorePrice, AppConstant} from '../../util/index';

/**
 * ResourceType Service: Fetch all resourcetypes used in project 
 */
@Injectable()
export class OnshoreService {

    public onshore$:Observable<OnshorePrice[]>;

    constructor(private http: Http) {}

    fetchAllOnshorePrices() : Observable<OnshorePrice[]> {
        console.log('OnshorePrice service '+Config.API + URLConfig.ONSHORE_PRICE.ALL);
            this.onshore$ = this.http.get(Config.API + URLConfig.ONSHORE_PRICE.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseOnshorePrice);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    });
        return this.onshore$;
    }
}
