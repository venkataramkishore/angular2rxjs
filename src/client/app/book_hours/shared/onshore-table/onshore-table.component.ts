import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'onshore-table',
    templateUrl: 'onshore-table.component.html'
})
export class OnshoreTableComponent<T> implements OnInit {

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

    getOnshoreList(): T[] {
        return _.filter(this.resources, {resourceType: {resourceType:'Onshore'}});
    }
}
