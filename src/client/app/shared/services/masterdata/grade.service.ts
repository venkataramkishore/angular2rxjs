import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Subject}     from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Config} from '../../index';
import {URLConfig, ResponseData, Grade} from '../../models/index';
import {parseResponse, parseGrade, AppConstant} from '../../util/index';

/**
 * Grade Service: Fetch all grades  
 */
@Injectable()
export class GradeService {
    private gradeSubject$:Subject<Grade[]> = new ReplaySubject<Grade[]>(1);
    private grade$:Observable<Grade[]> = this.gradeSubject$.asObservable();

    constructor(private http: Http) {}

    fetchAllGrades() : Observable<Grade[]> {
        console.log('Grade service '+Config.API + URLConfig.GRADE.ALL);
           this.http.get(Config.API + URLConfig.GRADE.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseGrade);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    })
            .subscribe((gradeList: Grade[]) => {
                if (_.isArray(gradeList) && gradeList.length>0) {
                   this.gradeSubject$.next(gradeList);
                }
            },
            this.handleOnError.bind(this));
        return this.grade$;
    }
    private handleOnError(error: any): void {
        //this.errorMsg = error.message || error.statusText;
        console.log(error);
    }
}
