import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Config} from '../../index';
import {URLConfig, ResponseData, Grade} from '../../models/index';
import {parseResponse, parseGrade, AppConstant} from '../../util/index';

/**
 * ResourceType Service: Fetch all resourcetypes used in project 
 */
@Injectable()
export class GradeService {

    public grade$:Observable<Grade[]>;

    constructor(private http: Http) {}

    fetchAllGrades() : Observable<Grade[]> {
        console.log('Grade service '+Config.API + URLConfig.GRADE.ALL);
            this.grade$ = this.http.get(Config.API + URLConfig.GRADE.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseGrade);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    });
        return this.grade$;
    }
}
