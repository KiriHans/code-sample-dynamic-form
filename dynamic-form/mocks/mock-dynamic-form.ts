import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JsonFormDataInterface } from '../interfaces/json-form-data.interface';

@Component({
  selector: 'app-dynamic-form',
  template: `<div class="mock-content">Dynamic Form rendered</div>`,
})
export class MockDynamicFormComponent {
  @Input() formData: JsonFormDataInterface;
  @Input() dynamicFormGroup: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder) {}
}
