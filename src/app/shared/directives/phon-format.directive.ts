import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[wgdPhonFormat]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PhonFormatDirective,
      multi: true
    }
  ]
})
export class PhonFormatDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors {

    const match = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,3,5-9]))\d{8}$/.test(control.value);
    console.log(control.value, match);
    if (match) {
      return null;
    } else {
      return { phone: !match };

    }

  }
  registerOnValidatorChange?(fn: () => void): void {
    // throw new Error('Method not implemented.');
  }
}
