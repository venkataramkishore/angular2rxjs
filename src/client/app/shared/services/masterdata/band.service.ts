import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Config} from '../../index';
import {URLConfig, ResponseData, Band} from '../../models/index';
import {parseResponse, parseBand, AppConstant} from '../../util/index';

/**
 * ResourceType Service: Fetch all resourcetypes used in project 
 */
@Injectable()
export class BandService {

    public bands$:Observable<Band[]>;

    constructor(private http: Http) {}

    fetchAllBands() : Observable<Band[]> {
        console.log('Band service '+Config.API + URLConfig.BAND.ALL);
            this.bands$ = this.http.get(Config.API + URLConfig.BAND.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseBand);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    });
        return this.bands$;
    }
}
