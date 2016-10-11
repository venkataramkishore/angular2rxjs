import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {StatusService} from '../../shared/services/index';
import {Status} from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'status-list',
    templateUrl: 'status.component.html'
})
export class StatusComponent implements OnInit, OnDestroy {
    public statuses$: Observable<Status[]>;
    public isAvailable: boolean;
    public errorMsg: string;

    private resSub: Subscription;

    constructor(private StatusService:StatusService) {}

    ngOnInit() {
        this.isAvailable = false;
        this.statuses$ = this.StatusService.fetchAllStatus();
        this.resSub = this.statuses$.subscribe(
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

    private handleOnNext(statusList:Status[]) : void {
        if(_.isArray(statusList)) {
            this.isAvailable = true;
        }
    }

    private handleOnError(error:any): void {
        this.errorMsg = error.message || error.statusText;
        console.log(error);
        this.isAvailable = false;
    }

    private handleOnComplete(): void {
        console.log('Status List observable completed..!!');
    }

}