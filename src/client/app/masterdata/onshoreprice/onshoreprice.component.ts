import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {OnshoreService} from '../../shared/services/index';
import {OnshorePrice} from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'onshore-prices',
    templateUrl: 'onshoreprice.component.html'
})
export class OnshorePriceComponent implements OnInit, OnDestroy {
    public onshorePrices$: Observable<OnshorePrice[]>;
    public isAvailable: boolean;
    public errorMsg: string;

    private resSub: Subscription;

    constructor(private OnshoreService:OnshoreService) {}

    ngOnInit() {
        this.isAvailable = false;
        this.onshorePrices$ = this.OnshoreService.fetchAllOnshorePrices();
        this.resSub = this.onshorePrices$.subscribe(
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

    private handleOnNext(onshorePriceList:OnshorePrice[]) : void {
        if(_.isArray(onshorePriceList)) {
            this.isAvailable = true;
        }
    }

    private handleOnError(error:any): void {
        this.errorMsg = error.message || error.statusText;
        console.log(error);
        this.isAvailable = false;
    }

    private handleOnComplete(): void {
        console.log('OnshorePrice List observable completed..!!');
    }

}
