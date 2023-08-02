import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { JsonFormControlInterface } from 'src/app/dynamic-form/interfaces/json-form-control.interface';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicInputComponent implements OnInit {
  @Input() control: JsonFormControlInterface;
  formName: FormGroup;

  constructor(private formgroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    this.formName = this.formgroupDirective.control;
  }
}
