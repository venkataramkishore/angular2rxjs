import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Subject}     from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/catch';
import {Config} from '../../index';
import { URLConfig, ResponseData, ResourceType } from '../../models/index';
import { parseResponse, parseResourceType, AppConstant } from '../../util/index';

/**
 * ResourceType Service: Fetch all resourcetypes used in project 
 */
@Injectable()
export class ResourceTypeService {
    private resourceTypeSubject$: Subject<ResourceType[]> = new ReplaySubject<ResourceType[]>(1);

    private resourceType$: Observable<ResourceType[]> = this.resourceTypeSubject$.asObservable();

    constructor(private http: Http) { }

    fetchAllResourceTypes(): Observable<ResourceType[]> {
        console.log('resource type service '+ Config.API + URLConfig.RESOURCE_TYPE.ALL);
        this.http.get(Config.API + URLConfig.RESOURCE_TYPE.ALL)
            .map((response: Response) => <any>response.json())
            .map((response: any) => {
                let responseData: ResponseData = parseResponse(response);
                if (_.isEqual(responseData.status, AppConstant.SUCCESS)) {
                    return responseData.successResponse.map(parseResourceType);
                } else if (_.isEqual(responseData.status, AppConstant.FAILURE)) {
                    throw new Error(responseData.failureResponse);
                }
            })
            .subscribe((resTypeList:ResourceType[]) => {
                if (_.isArray(resTypeList) && resTypeList.length>0) {
                    this.resourceTypeSubject$.next(resTypeList);
                }
            },
            this.handleOnError.bind(this));
        return this.resourceType$;
    }

    private handleOnError(error: any): void {
        //this.errorMsg = error.message || error.statusText;
        console.log(error);
    }
}
