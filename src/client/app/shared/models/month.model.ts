/**
 * Month model contains the details of each month
 * {name:$scope.headerMonths[month], total:0, weeks:{w1:0, w2:0, w3:0, w4:0}}
 */
import { Week } from './index';

export class Month {
    constructor(
        public name:string,
        public total:number,
        public weeks:Week
    ) {
        this.name = name;
        this.total = total;
        this.weeks = weeks;
    }
}
