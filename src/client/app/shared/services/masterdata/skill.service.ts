import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Subject}     from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Config} from '../../index';
import {URLConfig, ResponseData, Skill} from '../../models/index';
import {parseResponse, parseSkill, AppConstant} from '../../util/index';

/**
 * Skill Service: Fetch all skills respective resource type
 */
@Injectable()
export class SkillService {
    private skillSubject$:Subject<Skill[]> = new ReplaySubject<Skill[]>(1);
    private skill$:Observable<Skill[]> = this.skillSubject$.asObservable();

    constructor(private http: Http) {}

    fetchAllSkills() : Observable<Skill[]> {
        console.log('skill service '+Config.API + URLConfig.SKILL.ALL);
            this.http.get(Config.API + URLConfig.SKILL.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseSkill);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    })
            .subscribe((skillList: Skill[]) => {
                if (_.isArray(skillList) && skillList.length>0) {
                   this.skillSubject$.next(skillList);
                }
            },
            this.handleOnError.bind(this));
        return this.skill$;
    }
    private handleOnError(error: any): void {
        //this.errorMsg = error.message || error.statusText;
        console.log(error);
    }
}
