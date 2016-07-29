import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import {Config} from '../../index';
import {URLConfig, ResponseData, Skill} from '../../models/index';
import {parseResponse, parseSkill, AppConstant} from '../../util/index';

/**
 * Skill Service: Fetch all skills respective resource type
 */
@Injectable()
export class SkillService {

    public skill$:Observable<Skill[]>;

    constructor(private http: Http) {}

    fetchAllSkills() : Observable<Skill[]> {
        console.log('skill service '+Config.API + URLConfig.SKILL.ALL);
            this.skill$ = this.http.get(Config.API + URLConfig.SKILL.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseSkill);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    });
        return this.skill$;
    }
}
