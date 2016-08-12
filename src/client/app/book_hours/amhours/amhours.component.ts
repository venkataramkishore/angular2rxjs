import { Component, OnInit, OnDestroy } from '@angular/core';
import {LocalStorageService} from 'ng2-webstorage';

import { AMResource, Resource, Contract, Month, Week } from '../../shared/models/index';
import { ResourceFormComponent, OnshoreTableComponent, OffshoreTableComponent } from '../shared/index';
import { CurrencyFormatPipe } from '../../shared/pipes/index';
import * as _  from 'lodash';
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'am-hour',
    templateUrl: 'amhours.component.html',
    directives: [ResourceFormComponent, OnshoreTableComponent, OffshoreTableComponent],
    pipes:[CurrencyFormatPipe]
})
export class AMHoursComponent implements OnInit, OnDestroy {

    public resourceList:AMResource[] = new Array<AMResource>();
    private selectedContract:Contract;

    constructor( private localSt:LocalStorageService) {
        //TODO::
    }

    ngOnInit() {
        this.selectedContract = this.localSt.retrieve('sel-contract');
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
        amRes.months = this.facilitateMonths(amRes);
        this.resourceList.push(amRes);
    }

    deleteResource( resource:AMResource ):void {
        console.log('Delete Am Resource');
        console.log(resource);
    }

    private facilitateMonths(amRes:AMResource):Month[] {
        let months:Array<Month> = new Array<Month>();
        if(_.isObject(amRes)) {
            const start = moment(this.selectedContract.contractStartDate).get('month'); //moment().month(Number|String);
            var noofMonths = moment(this.selectedContract.contractEndDate)
                    .diff(moment(this.selectedContract.contractStartDate), 'months', true);
            for(var i=start; i<(noofMonths+start);i++ ) {
                var mName = moment().month(i).format('MMM')+' '+ moment().month(i).format('YY');
                const price = amRes.price * 8;// price multiply by 8 hours as const.
                let month:Month = new Month(mName, new Week(price, price, price, price));
                months.push(month);
            }
        }
        return months;
    }
}
