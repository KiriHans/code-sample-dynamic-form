import { DynamicInputType } from '../types/dynamic-input-types.type';
import { JsonFormControlOptionInterface } from './json-form-control-options.interface';
import { JsonFormValidatorsInterface } from './json-form-validator.interface';

export interface JsonFormControlInterface {
  name: string;
  label: string;
  value: string;
  type: DynamicInputType;
  options?: JsonFormControlOptionInterface[];
  validators: JsonFormValidatorsInterface;
  additional_comment?: boolean;
}
