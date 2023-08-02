import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFieldComponent } from './components/dynamic-field/dynamic-field.component';
import { DynamicInputComponent } from './components/dynamic-field/dynamic-input/dynamic-input.component';
import { DynamicSelectComponent } from './components/dynamic-field/dynamic-select/dynamic-select.component';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CardComponent } from '../shared/components/card/card.component';
import { DynamicSelectWithValueComponent } from './components/dynamic-field/dynamic-select-with-value/dynamic-select-with-value.component';

const standaloneComponents = [ButtonComponent, CardComponent];
const materialModules = [MatInputModule, MatSelectModule, MatRadioModule];
const dynamicFormComponent = [
  DynamicFormComponent,
  DynamicFieldComponent,
  DynamicInputComponent,
  DynamicSelectComponent,
  DynamicSelectWithValueComponent,
];
@NgModule({
  declarations: [...dynamicFormComponent],
  imports: [CommonModule, ReactiveFormsModule, ...standaloneComponents, ...materialModules],
  exports: [...dynamicFormComponent],
})
export class DynamicFormModule {}
