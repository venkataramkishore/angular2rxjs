import { Component, OnInit, OnDestroy } from '@angular/core';
import { KTResource, Resource, Contract, Month, Week } from '../../shared/models/index';
import { LocalStorageService } from 'ng2-webstorage';
import * as moment from 'moment';

/**
 * KT Hours to show the knowledge transfer hours for the contract.
 * @export
 * @class KTHoursComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
    moduleId: module.id,
    selector: 'kt-hours',
    templateUrl: 'kthours.component.html'
})
export class KTHoursComponent implements OnInit, OnDestroy {

    /**
     * List of resource allocated for the KT hours.
     * @type {KTResource[]}
     * @memberOf KTHoursComponent
     */
    public resourceList:KTResource[] = new Array<KTResource>();
    /**
     * KT Hours for selected contract.
     * @private
     * @type {Contract}
     * @memberOf KTHoursComponent
     */
    private selectedContract:Contract;

    /**
     * Creates an instance of KTHoursComponent.
     * @param {LocalStorageService} localSt
     * @memberOf KTHoursComponent
     */
    constructor(private localSt:LocalStorageService) {
        //TODO::
    }

    /**
     * ng2 life cycle method before init
     * @memberOf KTHoursComponent
     */
    ngOnInit() {
       this.selectedContract = this.localSt.retrieve('sel-contract');
    }
    /**
     * life cycle ng2 method before destroy
     * @memberOf KTHoursComponent
     */
    ngOnDestroy() {
        //TODO::
    }
    /**
     * Add AM Resource to the list
     * @param {Resource} resource
     * @memberOf KTHoursComponent
     */
    addResource(resource:Resource):void {
        console.log(resource);
        const ktRes:KTResource = <KTResource> resource;
        ktRes.months = this.facilitateMonths(ktRes);
        this.resourceList.push(ktRes);
    }

    /**
     * Delete resource from the list.
     * @param {KTResource} resource
     * 
     * @memberOf KTHoursComponent
     */
    deleteResource( resource:KTResource ):void {
        console.log('Delete KT Resource');
        console.log(resource);
    }

    /**
     * Utitlity method for calculation of months based on contract start date and end date.
     * @private
     * @param {KTResource} ktRes
     * @returns {Month[]}
     * 
     * @memberOf KTHoursComponent
     */
    private facilitateMonths(ktRes:KTResource):Month[] {
        let months:Array<Month> = new Array<Month>();
        if(_.isObject(ktRes)) {
            const start = moment(this.selectedContract.contractStartDate).get('month'); //moment().month(Number|String);
            var noofMonths = moment(this.selectedContract.contractEndDate)
                    .diff(moment(this.selectedContract.contractStartDate), 'months', true);
            for(var i=start; i<(noofMonths+start);i++ ) {
                var mName = moment().month(i).format('MMM')+' '+ moment().month(i).format('YY');
                const price = (ktRes.price * 8)+'';// price multiply by 8 hours as const.
                let month:Month = new Month(mName, new Week(price, price, price, price));
                months.push(month);
            }
        }
        return months;
    }

}
