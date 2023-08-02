import { Component, Input } from '@angular/core';
import { JsonFormControlInterface } from '../interfaces/json-form-control.interface';

@Component({
  selector: 'app-dynamic-select',
  template: `<div class="mock-content-select">
    Dynamic Select rendered, {{ control.name }}, {{ control.type }}
  </div>`,
})
export class MockDynamicSelectComponent {
  @Input() control: JsonFormControlInterface;
}
