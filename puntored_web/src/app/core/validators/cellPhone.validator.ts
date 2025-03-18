import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function cellPhoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      if (!value) {
        return { required: true };
      }
  
      const isNumeric = /^\d+$/.test(value);
      const hasValidLength = value.length === 10;
      const startsWithThree = value.startsWith('3');
  
      if (!isNumeric || !hasValidLength || !startsWithThree) {
        return { invalidCellPhone: true };
      }
  
      return null;
    };
  }