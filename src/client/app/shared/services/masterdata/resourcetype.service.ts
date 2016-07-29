import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {Config} from '../../index';
import { URLConfig, ResponseData, ResourceType } from '../../models/index';
import { parseResponse, parseResourceType, AppConstant } from '../../util/index';

/**
 * ResourceType Service: Fetch all resourcetypes used in project 
 */
@Injectable()
export class ResourceTypeService {

    public resourceType$:Observable<ResourceType[]>;

    constructor(private http: Http) {}

    fetchAllResourceTypes() : Observable<ResourceType[]> {
        console.log('authenticate user service');
        console.log(Config.API + URLConfig.RESOURCE_TYPE.ALL);
            this.resourceType$ = this.http.get(Config.API + URLConfig.RESOURCE_TYPE.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseResourceType);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    });
        return this.resourceType$;
    }
}
