import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {Subject}     from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Config} from '../../index';
import {URLConfig, ResponseData, BusinessLine} from '../../models/index';
import {parseResponse, parseBusinessLine, AppConstant} from '../../util/index';
/**
 * BusinessLine Service: Fetch all fixed hours for the contract 
 */
@Injectable()
export class BusinessLineService {

    private businessLineSubject$:Subject<BusinessLine[]> = new ReplaySubject<BusinessLine[]>(1);
    private businessLine$:Observable<BusinessLine[]> = this.businessLineSubject$.asObservable();

    constructor(private http:Http) {}

    /**
     * Fetch all available business lines
     */
    fetchAllBusinessLines(): Observable<BusinessLine[]> {
        console.log('BusinessLine service '+Config.API + URLConfig.BUSINESS_LINE.ALL);
        this.http.get(Config.API + URLConfig.BUSINESS_LINE.ALL)
                    .map((response:Response) => <any>response.json())
                    .map((response:any) => {
                        let responseData:ResponseData = parseResponse(response);
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseBusinessLine);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    })
            .subscribe((businessLineList: BusinessLine[]) => {
                if (_.isArray(businessLineList) && businessLineList.length>0) {
                   this.businessLineSubject$.next(businessLineList);
                }
            },
            this.handleOnError.bind(this));
        return this.businessLine$;
    }
    /**
     * Fetch all business lines based on resource type
     * Valid for only Onshore
     */
    fetchBusinessLinesOnResourceType(resourcetypeId:string): Observable<BusinessLine[]> {
        let url = URLConfig.BUSINESS_LINE.RESOURCE_TYPE.replace(AppConstant.p_rt, resourcetypeId);
        console.log('ResourceTypes BusinessLine service '+Config.API + url);
            this.http.get(Config.API + url)
                    .map((response:Response) => <any>response.json())
                    .map((responseData:ResponseData) => {
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseBusinessLine);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    })
            .subscribe((businessLineList: BusinessLine[]) => {
                if (_.isArray(businessLineList) && businessLineList.length>0) {
                   this.businessLineSubject$.next(businessLineList);
                }
            },
            this.handleOnError.bind(this));
        return this.businessLine$;
    }
    /**
     * Fetch the business lines based on the Resource Type and skill set selection
     * Valid only for offshore resource type
     */
    fetchBusinessLinesOnResourceTypeAndSkill(resourcetypeId:string, skillId:string): Observable<BusinessLine[]> {

        let url = URLConfig.BUSINESS_LINE.RESOURCE_TYPE_SKILL.replace(AppConstant.p_rt, resourcetypeId);
            url = url.replace(AppConstant.p_sk, skillId);
        console.log('ResourceTypes & Skills BusinessLine service '+Config.API + url);
            this.http.get(Config.API + url)
                    .map((response:Response) => <any>response.json())
                    .map((responseData:ResponseData) => {
                        if( _.isEqual(responseData.status, AppConstant.SUCCESS) ) {
                            return responseData.successResponse.map(parseBusinessLine);
                        }else if( _.isEqual(responseData.status, AppConstant.FAILURE)) {
                            throw new Error(responseData.failureResponse);
                        }
                    })
            .subscribe((businessLineList: BusinessLine[]) => {
                if (_.isArray(businessLineList) && businessLineList.length>0) {
                   this.businessLineSubject$.next(businessLineList);
                }
            },
            this.handleOnError.bind(this));
        return this.businessLine$;
    }

    private handleOnError(error: any): void {
        console.log(error);
    }
}
