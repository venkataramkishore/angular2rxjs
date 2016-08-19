/**
 * Month model contains the details of each month
 * {name:$scope.headerMonths[month], total:0, weeks:{w1:0, w2:0, w3:0, w4:0}}
 */
import { Week } from './index';
import * as lodash from 'lodash';

export class Month {
    public total:number;
    public isError:boolean=false;

    constructor(
        public name:string,
        public weeks:Week
    ) {
        this.name = name;
        this.weeks = weeks;
        this.total = lodash.toNumber(this.weeks.w1) + lodash.toNumber(this.weeks.w2) +
                        lodash.toNumber(this.weeks.w3) + lodash.toNumber(this.weeks.w4);
    }
    calculateTotal() :void {
        this.isError=false;
        if(lodash.toNumber(this.weeks.w1) && lodash.toNumber(this.weeks.w2) &&
            lodash.toNumber(this.weeks.w3) && lodash.toNumber(this.weeks.w4)) {
                this.total = lodash.toNumber(this.weeks.w1) + lodash.toNumber(this.weeks.w2) +
                        lodash.toNumber(this.weeks.w3) + lodash.toNumber(this.weeks.w4);
        }else {
            this.isError = true;
        }
    }
}
