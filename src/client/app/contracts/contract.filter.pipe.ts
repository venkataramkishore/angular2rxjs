import { Pipe, PipeTransform } from '@angular/core';

import { Contract } from '../shared/models/index';

@Pipe({
    name: 'searchFilter'
})
export class ContractFilterPipe implements PipeTransform {
    transform(contractList:Contract[], searchKey:string): Contract[] {
        return contractList.filter((item: Contract) => item.customerName.indexOf(searchKey)!==-1);
    }
}
