import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {ResourceTypeService} from '../../shared/services/index';
import {ResourceType} from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'resource-type',
    templateUrl: 'resourcetype.component.html'
})
export class ResourceTypeComponent implements OnInit, OnDestroy {
    public resourceType$: Observable<ResourceType[]>;
    public isAvailable: boolean;
    public errorMsg: string;

    private resSub: Subscription;

    constructor(private resTypeService:ResourceTypeService) {}

    ngOnInit() {
        this.isAvailable = false;
        this.resourceType$ = this.resTypeService.fetchAllResourceTypes();
        this.resSub = this.resourceType$.subscribe(
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

    private handleOnNext(resTypeList:ResourceType[]) : void {
        if(_.isArray(resTypeList) && resTypeList.length>0) {
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
