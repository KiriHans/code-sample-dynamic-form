import { Component, Input } from '@angular/core';
import { JsonFormControlInterface } from '../interfaces/json-form-control.interface';

@Component({
  selector: 'app-dynamic-select-with-value',
  template: `<div class="mock-content-select">
    Dynamic Select with value rendered, {{ control.name }}, {{ control.type }}
  </div>`,
})
export class MockDynamicSelectWithValueComponent {
  @Input() control: JsonFormControlInterface;
}
