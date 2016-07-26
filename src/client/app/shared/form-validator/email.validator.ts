import {FormControl} from '@angular/forms';
import {Directive } from '@angular/core';
import {NG_VALIDATORS} from '@angular/forms';


export function validateEmail(c: FormControl) {
  const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

  return regexEmail.test(c.value) ? null : {
    validateEmail: {
      valid: false
    }
  };
}

@Directive({
  selector: '[validateEmail][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useValue: validateEmail, multi: true }
  ]
})
export class EmailValidatorDirective {}
