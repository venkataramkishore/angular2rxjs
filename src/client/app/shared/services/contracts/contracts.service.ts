import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';
import { URLConfig, parseContract, parseResponse, ResponseData, AppConstant } from '../../index';
import { Contract } from '../../models/contract.model';

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
            this.listOfContracts$ = this.http.get( URLConfig.HOST_URL+URLConfig.CONTRACT_ALL)
            .map((res: Response) => res.json())
            .map((response:any) => {
                 let responseData:ResponseData = parseResponse(response);
                 if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                     return responseData.successResponse.map(parseContract);
                 }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                     console.error(responseData.failureResponse);
                     return [];
                 }
            });
        }
        return this.listOfContracts$;
    }
}
