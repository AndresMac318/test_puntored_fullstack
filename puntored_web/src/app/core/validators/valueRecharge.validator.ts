import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function valueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      if (!value) {
        return { required: true };
      }
  
      const isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
      const isInRange = value >= 1000 && value <= 100000;
  
      if (!isNumeric || !isInRange) {
        return { invalidValue: true };
      }
  
      return null;
    };
}