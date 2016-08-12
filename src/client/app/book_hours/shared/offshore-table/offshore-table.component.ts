import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyFormatPipe } from '../../../shared/pipes/index';

@Component({
    moduleId: module.id,
    selector: 'offshore-table',
    templateUrl: 'offshore-table.component.html',
    pipes:[CurrencyFormatPipe]
})
export class OffshoreTableComponent<T> implements OnInit {

    @Input('resources')
    public resources:T[];

    @Output()
    public deleteResourceEmitter:EventEmitter<T> = new EventEmitter<T>();

    constructor() {
        //TODO::
    }

    ngOnInit() {
        //TODO::
    }

    deleteResource( myResource:T ):void {
        this.deleteResourceEmitter.emit(myResource);
    }

     getOffshoreList(): T[] {
         return _.filter(this.resources, {resourceType:{resourceType:'Offshore'}});
    }
}
