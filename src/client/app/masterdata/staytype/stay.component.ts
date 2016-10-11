import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {StayService} from '../../shared/services/index';
import {Stay} from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'stay-list',
    templateUrl: 'stay.component.html'
})
export class StayComponent implements OnInit, OnDestroy {
    public stays$: Observable<Stay[]>;
    public isAvailable: boolean;
    public errorMsg: string;

    private resSub: Subscription;

    constructor(private stayService:StayService) {}

    ngOnInit() {
        this.isAvailable = false;
        this.stays$ = this.stayService.fetchAllStays();
        this.resSub = this.stays$.subscribe(
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

    private handleOnNext(stayList:Stay[]) : void {
        if(_.isArray(stayList)) {
            this.isAvailable = true;
        }
    }

    private handleOnError(error:any): void {
        this.errorMsg = error.message || error.statusText;
        console.log(error);
        this.isAvailable = false;
    }

    private handleOnComplete(): void {
        console.log('Stay List observable completed..!!');
    }

}
