import { Validators, ValidatorFn } from '@angular/forms';
import { ValidatorsInput } from '../types/validators-inputs.type';
import { ValidatorsKeys } from '../types/validators-keys.type';

const exhaustiveGuard = (value: never): never => {
  throw new Error(
    `Reached end of switch: Missing validator (${value}) in 'FORM_VALIDATORS' function`
  );
};

export const FORM_VALIDATORS = (
  key: ValidatorsKeys,
  value: ValidatorsInput
): ValidatorFn | null => {
  switch (key) {
    case 'min':
      if (typeof value === 'number') {
        return Validators.min(value);
      }
      break;

    case 'max':
      if (typeof value === 'number') {
        return Validators.max(value);
      }
      break;

    case 'required':
      if (value) {
        return Validators.required;
      }
      break;

    case 'requiredTrue':
      if (value) {
        return Validators.requiredTrue;
      }
      break;

    case 'email':
      if (value) {
        return Validators.email;
      }
      break;

    case 'minLength':
      if (typeof value === 'number') {
        return Validators.minLength(value);
      }
      break;

    case 'maxLength':
      if (typeof value === 'number') {
        return Validators.maxLength(value);
      }
      break;

    case 'pattern':
      if (typeof value === 'string') {
        return Validators.pattern(value);
      }
      break;

    case 'nullValidator':
      if (value) {
        return Validators.nullValidator;
      }
      break;

    default:
      exhaustiveGuard(key);
      break;
  }
  return null;
};
