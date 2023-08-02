import { Component, Input } from '@angular/core';
import { JsonFormControlInterface } from '../interfaces/json-form-control.interface';

@Component({
  selector: 'app-dynamic-input',
  template: `<div class="mock-content-input">
    Dynamic Input rendered, {{ control.name }}, {{ control.type }}
  </div>`,
})
export class MockDynamicInputComponent {
  @Input() control: JsonFormControlInterface;
}
