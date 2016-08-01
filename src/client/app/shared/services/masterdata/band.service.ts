import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Subject}     from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Config} from '../../index';
import {URLConfig, ResponseData, Band} from '../../models/index';
import {parseResponse, parseBand, AppConstant} from '../../util/index';

/**
 * Band Service: Fetch all bands of resource 
 */
@Injectable()
export class BandService {
    private bandSubject$: Subject<Band[]> = new ReplaySubject<Band[]>(1);

    private bands$: Observable<Band[]> = this.bandSubject$.asObservable();

    constructor(private http: Http) { }

    fetchAllBands(): Observable<Band[]> {
        console.log('Band service ' + Config.API + URLConfig.BAND.ALL);
        this.http.get(Config.API + URLConfig.BAND.ALL)
            .map((response: Response) => <any>response.json())
            .map((response: any) => {
                let responseData: ResponseData = parseResponse(response);
                if (_.isEqual(responseData.status, AppConstant.SUCCESS)) {
                    return responseData.successResponse.map(parseBand);
                } else if (_.isEqual(responseData.status, AppConstant.FAILURE)) {
                    throw new Error(responseData.failureResponse);
                }
            })
            .subscribe((bandList: Band[]) => {
                if (_.isArray(bandList) && bandList.length>0) {
                   this.bandSubject$.next(bandList);
                }
            },
            this.handleOnError.bind(this));
        return this.bands$;
    }
    private handleOnError(error: any): void {
        //this.errorMsg = error.message || error.statusText;
        console.log(error);
    }
}
