import { Component, OnInit, OnDestroy } from '@angular/core';
import { KTResource } from '../../shared/models/index';
import { ResourceFormComponent, OnshoreTableComponent, OffshoreTableComponent } from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'kt-hours',
    templateUrl: 'kthours.component.html',
    directives: [ResourceFormComponent, OnshoreTableComponent, OffshoreTableComponent]
})
export class KTHoursComponent implements OnInit, OnDestroy {

    public resourceList:KTResource[];

    constructor() {
        //TODO::
    }

    ngOnInit() {
        //TODO::
    }
    ngOnDestroy() {
        //TODO::
    }

    deleteResource( resource:KTResource ):void {
        console.log('Delete KT Resource');
        console.log(resource);
    }
}
