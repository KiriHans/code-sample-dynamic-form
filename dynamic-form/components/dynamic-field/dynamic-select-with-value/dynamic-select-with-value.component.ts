import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { JsonFormControlInterface } from 'src/app/dynamic-form/interfaces/json-form-control.interface';

@Component({
  selector: 'app-dynamic-select-with-value',
  templateUrl: './dynamic-select-with-value.component.html',
  styleUrls: ['./dynamic-select-with-value.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSelectWithValueComponent implements OnInit {
  @Input() control: JsonFormControlInterface;
  formName: FormGroup;

  constructor(private formgroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    this.formName = this.formgroupDirective.control;
  }

  public get valueControl() {
    return this.formName.get(`${this.control.name}.value`) as FormControl;
  }
  public get additionalCommentControl() {
    return this.formName.get(`${this.control.name}.additionalComment`) as FormControl;
  }
}
