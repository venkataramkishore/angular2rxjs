import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {OffshoreService} from '../../shared/services/index';
import {OffshorePrice} from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'offshore-prices',
    templateUrl: 'offshoreprice.component.html'
})
export class OffshorePriceComponent implements OnInit, OnDestroy {
    public offshorePrices$: Observable<OffshorePrice[]>;
    public isAvailable: boolean;
    public errorMsg: string;

    private resSub: Subscription;

    constructor(private OffshoreService:OffshoreService) {}

    ngOnInit() {
        this.isAvailable = false;
        this.offshorePrices$ = this.OffshoreService.fetchAllOffshorePrices();
        this.resSub = this.offshorePrices$.subscribe(
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

    private handleOnNext(offshorePriceList:OffshorePrice[]) : void {
        if(_.isArray(offshorePriceList)) {
            this.isAvailable = true;
        }
    }

    private handleOnError(error:any): void {
        this.errorMsg = error.message || error.statusText;
        console.log(error);
        this.isAvailable = false;
    }

    private handleOnComplete(): void {
        console.log('OffshorePrice List observable completed..!!');
    }
}
