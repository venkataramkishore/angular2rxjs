import { Injectable }     from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ResponseData } from '../../models/index';
import { parseResponse } from '../../util/index';

@Injectable()
export class MasterDataService {

    constructor (protected http:Http) {}

    getRequest(url:string):Observable<ResponseData> {
        return  this.http.get(url)
                    .map((response:Response) => <any>response.json())
                    .map((response:Response) => {
                        return parseResponse(response);
                    });
    }
}
