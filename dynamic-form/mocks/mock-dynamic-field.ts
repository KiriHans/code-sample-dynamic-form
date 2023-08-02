import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsonFormControlInterface } from '../interfaces/json-form-control.interface';

@Component({
  selector: 'app-dynamic-field',
  template: `<div class="mock-content">
    Dynamic Field rendered, {{ control.name }}, {{ control.type }}
  </div>`,
})
export class MockDynamicFieldComponent {
  @Input() control: JsonFormControlInterface;
  @Input() formName: FormGroup;
}
