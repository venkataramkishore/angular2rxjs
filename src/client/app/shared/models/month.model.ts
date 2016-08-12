/**
 * Month model contains the details of each month
 * {name:$scope.headerMonths[month], total:0, weeks:{w1:0, w2:0, w3:0, w4:0}}
 */
import { Week } from './index';

export class Month {
    public total:number;
    constructor(
        public name:string,
        public weeks:Week
    ) {
        this.name = name;
        this.weeks = weeks;
        this.total = this.weeks.w1 + this.weeks.w2 + this.weeks.w3 + this.weeks.w4;
    }
}
