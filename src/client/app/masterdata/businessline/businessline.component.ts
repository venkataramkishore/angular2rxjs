import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {BusinessLineService} from '../../shared/services/index';
import {BusinessLine} from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'business-line',
    templateUrl: 'businessline.component.html'
})
export class BusinessLineComponent implements OnInit, OnDestroy {
    public businessLines$: Observable<BusinessLine[]>;
    public isAvailable: boolean;
    public errorMsg: string;

    private resSub: Subscription;

    constructor(private blineService:BusinessLineService) {}

    ngOnInit() {
        this.isAvailable = false;
        this.businessLines$ = this.blineService.fetchAllBusinessLines();
        this.resSub = this.businessLines$.subscribe(
                                        this.handleOnNext.bind(this),
                                        this.handleOnError.bind(this),
                                        this.handleOnComplete
        );
    }

    ngOnDestroy() {
        if(this.resSub) {
            this.resSub.unsubscribe();
        }
    }

    private handleOnNext(resTypeList:BusinessLine[]) : void {
        if(_.isArray(resTypeList)) {
            this.isAvailable = true;
        }
    }

    private handleOnError(error:any): void {
        this.errorMsg = error.message || error.statusText;
        console.log(error);
        this.isAvailable = false;
    }

    private handleOnComplete(): void {
        console.log('Contract List observable completed..!!');
    }

}
