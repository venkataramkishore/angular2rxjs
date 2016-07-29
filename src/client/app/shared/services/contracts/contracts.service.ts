import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';
import { URLConfig, parseContract, parseResponse, ResponseData, AppConstant } from '../../index';
import { Contract } from '../../models/index';
import {Config} from '../../index';

@Injectable()
export class ContractService {

    public listOfContracts$:Observable<Contract[]>;
    public selectedContract:Contract;
    private isRequested:boolean = false;

    constructor(private http:Http) { }

    getAllContracts():Observable<Contract[]> {

        if(!this.isRequested) {
            //to control the request multiple times
            this.isRequested = true;
            this.listOfContracts$ = this.http.get(Config.API + URLConfig.CONTRACT.ALL)
            .map((res: Response) => res.json())
            .map((response:any) => {
                 let responseData:ResponseData = parseResponse(response);
                 if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                     return responseData.successResponse.map(parseContract);
                 }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                     throw new Error(responseData.failureResponse);
                 }
            });
        }
        return this.listOfContracts$;
    }
}
