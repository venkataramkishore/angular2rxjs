import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {BandService} from '../../shared/services/index';
import {Band} from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'band-list',
    templateUrl: 'band.component.html'
})
export class BandComponent implements OnInit, OnDestroy {
    public bands$: Observable<Band[]>;
    public isAvailable: boolean;
    public errorMsg: string;

    private resSub: Subscription;

    constructor(private bandService:BandService) {}

    ngOnInit() {
        this.isAvailable = false;
        this.bands$ = this.bandService.fetchAllBands();
        this.resSub = this.bands$.subscribe(
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

    private handleOnNext(bandList:Band[]) : void {
        if(_.isArray(bandList)) {
            this.isAvailable = true;
        }
    }

    private handleOnError(error:any): void {
        this.errorMsg = error.message || error.statusText;
        console.log(error);
        this.isAvailable = false;
    }

    private handleOnComplete(): void {
        console.log('Band List observable completed..!!');
    }
}
