import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsonFormControlInterface } from '../../interfaces/json-form-control.interface';

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFieldComponent {
  @Input() control: JsonFormControlInterface;
  @Input() formName: FormGroup;
}
