import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MatSelectHarness } from '@angular/material/select/testing';
import { MatInputHarness } from '@angular/material/input/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { DynamicSelectWithValueComponent } from './dynamic-select-with-value.component';

describe('DynamicSelectWithValueComponent', () => {
  let component: DynamicSelectWithValueComponent;
  let fixture: ComponentFixture<DynamicSelectWithValueComponent>;
  let el: DebugElement;
  let loader: HarnessLoader;

  let formBuilder: FormBuilder;
  let formGroupDirective: FormGroupDirective;
  let formGroupDirectiveSpy: jasmine.Spy<(this: FormGroupDirective) => FormGroup<object>>;

  let group: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicSelectWithValueComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
      ],
      providers: [FormBuilder, FormGroupDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicSelectWithValueComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    loader = TestbedHarnessEnvironment.loader(fixture);

    formBuilder = TestBed.inject(FormBuilder);
    formGroupDirective = TestBed.inject(FormGroupDirective);

    component.control = {
      name: 'name',
      label: 'label',
      value: '',
      type: 'select_with_comment',
      options: [
        {
          key: 'test key',
          value: 'test value',
        },
      ],
      validators: {},
      additional_comment: true,
    };

    group = formBuilder.group({
      name: formBuilder.group({
        value: '',
        additionalComment: '',
      }),
    });

    formGroupDirectiveSpy = spyOnProperty(formGroupDirective, 'control', 'get');
    formGroupDirectiveSpy.and.returnValue(group);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render labels', () => {
    const labels = el.queryAll(By.css('.label'));
    const [firstLabel, secondLabel] = labels;

    expect((firstLabel.nativeElement as HTMLElement).innerText).toBe('label');
    expect((secondLabel.nativeElement as HTMLElement).innerText).toBe('Additional comment');
  });

  it('should render input and select elements with their options', async () => {
    const select = await loader.getHarness(MatSelectHarness);
    const input = await loader.getHarness(MatInputHarness);

    await select.open();
    const selectElements = await select.getOptions();

    expect(selectElements.length).toBe(1);
    expect(await selectElements[0].getText()).toBe('test value');

    expect(input).toBeTruthy();
  });
});
