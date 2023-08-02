import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { FORM_VALIDATORS } from '../../constants/form-validators';
import { JsonFormControlInterface } from '../../interfaces/json-form-control.interface';
import { JsonFormDataInterface } from '../../interfaces/json-form-data.interface';

import { ValidatorsKeys } from '../../types/validators-keys.type';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit {
  @Input() formData: JsonFormDataInterface;
  @Input() dynamicFormGroup: FormGroup = this.fb.group({});
  fields: string[] = [];

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm(this.formData.controls);
  }

  buildForm(controls: JsonFormControlInterface[]) {
    controls.forEach((control) => {
      if (control.additional_comment) {
        this.addAdditionalCommentControl(control);
      } else {
        this.addControlForm(control);
      }
    });
  }

  addControlForm(control: JsonFormControlInterface) {
    this.dynamicFormGroup.addControl(
      control.name,
      this.fb.control(control.value, this.getValidators(control))
    );
  }

  addAdditionalCommentControl(control: JsonFormControlInterface) {
    this.dynamicFormGroup.addControl(
      control.name,
      this.fb.group({
        value: ['', this.getValidators(control)],
        additionalComment: [''],
      })
    );
  }

  // eslint-disable-next-line class-methods-use-this
  getValidators(control: JsonFormControlInterface) {
    if (!control) {
      return [];
    }
    const validatorsToAdd: ValidatorFn[] = [];

    Object.entries(control.validators).forEach(([key, value]) => {
      const validator = FORM_VALIDATORS(key as ValidatorsKeys, value);
      if (validator) {
        validatorsToAdd.push(validator);
      }
    });
    return validatorsToAdd;
  }
}
