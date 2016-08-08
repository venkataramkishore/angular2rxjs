import { Component, OnInit, OnDestroy } from '@angular/core';
import { AMResource, Resource } from '../../shared/models/index';
import { ResourceFormComponent, OnshoreTableComponent, OffshoreTableComponent } from '../shared/index';
import * as _  from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'am-hour',
    templateUrl: 'amhours.component.html',
    directives: [ResourceFormComponent, OnshoreTableComponent, OffshoreTableComponent]
})
export class AMHoursComponent implements OnInit, OnDestroy {

    public resourceList:AMResource[] = new Array<AMResource>();

    constructor() {
        //TODO::
    }

    ngOnInit() {
        //TODO::
    }
    ngOnDestroy() {
        //TODO::
    }
    /**
     * Add AM Resource to the list
     */
    addResource(resource:Resource):void {
        console.log(resource);
        let amRes:AMResource = Object.assign({}, resource);
        this.resourceList.push(amRes);
    }

    deleteResource( resource:AMResource ):void {
        console.log('Delete Am Resource');
        console.log(resource);
    }
}
