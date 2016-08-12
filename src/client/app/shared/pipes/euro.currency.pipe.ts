import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name : 'eurCcyFmt'
})
export class CurrencyFormatPipe implements PipeTransform {

	constructor() {
        //TODO::
	}

	transform(priceInCents: number) {
		return '\u20AC '+ (priceInCents / 100).toFixed(2).replace('.', ',');
	}
}
