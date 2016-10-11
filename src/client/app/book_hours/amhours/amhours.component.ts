import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'ng2-webstorage';
import { AMResource, Resource, Contract, Month, Week } from '../../shared/models/index';
import * as _  from 'lodash';

import * as moment from 'moment';

/**
 * AMhours to display available resources or yet to selecte resource.
 * @export
 * @class AMHoursComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
    moduleId: module.id,
    selector: 'am-hour',
    templateUrl: 'amhours.component.html'
})
export class AMHoursComponent implements OnInit, OnDestroy {

    /**
     * Resource list as input to the child component.
     * @type {AMResource[]}
     * @memberOf AMHoursComponent
     */
    public resourceList:AMResource[] = new Array<AMResource>();
    /**
     * To maintain selected contract.
     * @private
     * @type {Contract}
     * @memberOf AMHoursComponent
     */
    private selectedContract:Contract;

    /**
     * Creates an instance of AMHoursComponent.
     * @param {LocalStorageService} localSt
     * @memberOf AMHoursComponent
     */
    constructor( private localSt:LocalStorageService) {
        //TODO::
    }

    /**
     * Life cycle of ng2 before init
     * @memberOf AMHoursComponent
     */
    ngOnInit() {
        this.selectedContract = this.localSt.retrieve('sel-contract');
    }

    /**
     * life cycle of ng 2 before destroy
     * @memberOf AMHoursComponent
     */
    ngOnDestroy() {
        //TODO::
    }
    /**
     * Add AM Resource to the list
     * @param {Resource} resource
     * @memberOf AMHoursComponent
     */
    addResource(resource:Resource):void {
        console.log(resource);
        const amRes:AMResource = <AMResource> resource;
        amRes.months = this.facilitateMonths(amRes);
        this.resourceList.push(amRes);
    }

    /**
     * 
     * Delete resource from list.
     * @param {AMResource} resource
     * @memberOf AMHoursComponent
     */
    deleteResource( resource:AMResource ):void {
        console.log('Delete Am Resource');
        console.log(resource);
    }

    /**
     * Utitlity method to facilitate month calculation.
     * @private
     * @param {AMResource} amRes
     * @returns {Month[]}
     * @memberOf AMHoursComponent
     */
    private facilitateMonths(amRes:AMResource):Month[] {
        let months:Array<Month> = new Array<Month>();
        if(_.isObject(amRes)) {
            const start = moment(this.selectedContract.contractStartDate).get('month'); //moment().month(Number|String);
            var noofMonths = moment(this.selectedContract.contractEndDate)
                    .diff(moment(this.selectedContract.contractStartDate), 'months', true);
            for(var i=start; i<(noofMonths+start);i++ ) {
                var mName = moment().month(i).format('MMM')+' '+ moment().month(i).format('YY');
                const price = (amRes.price * 8)+'';// price multiply by 8 hours as const.
                let month:Month = new Month(mName, new Week(price, price, price, price));
                months.push(month);
            }
        }
        return months;
    }
}
