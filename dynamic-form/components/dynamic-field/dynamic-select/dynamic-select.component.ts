import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { JsonFormControlInterface } from 'src/app/dynamic-form/interfaces/json-form-control.interface';

@Component({
  selector: 'app-dynamic-select',
  templateUrl: './dynamic-select.component.html',
  styleUrls: ['./dynamic-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSelectComponent implements OnInit {
  @Input() control: JsonFormControlInterface;
  formName: FormGroup;

  constructor(private formgroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    this.formName = this.formgroupDirective.control;
  }
}
