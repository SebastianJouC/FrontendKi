import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const errors: ValidationErrors = {};

    if (!/[A-Z]/.test(value)) {
      errors['uppercase'] = 'Debe contener al menos una letra mayúscula.';
    }
    if (!/[a-z]/.test(value)) {
      errors['lowercase'] = 'Debe contener al menos una letra minúscula.';
    }
    if (!/\d/.test(value)) {
      errors['number'] = 'Debe contener al menos un número.';
    }
    if (!/[\W_]/.test(value)) {
      errors['special'] = 'Debe contener al menos un carácter especial.';
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
}
