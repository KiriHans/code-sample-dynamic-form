import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';

import { DebugElement } from '@angular/core';
import { FormBuilder, FormGroupDirective, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicSelectComponent } from './dynamic-select.component';

describe('DynamicSelectComponent', () => {
  let component: DynamicSelectComponent;
  let fixture: ComponentFixture<DynamicSelectComponent>;
  let el: DebugElement;
  let loader: HarnessLoader;

  let formBuilder: FormBuilder;
  let formGroupDirective: FormGroupDirective;
  let formGroupDirectiveSpy: jasmine.Spy<(this: FormGroupDirective) => FormGroup<object>>;

  let group: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicSelectComponent],
      imports: [NoopAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
      providers: [FormBuilder, FormGroupDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicSelectComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    loader = TestbedHarnessEnvironment.loader(fixture);

    formBuilder = TestBed.inject(FormBuilder);
    formGroupDirective = TestBed.inject(FormGroupDirective);

    component.control = {
      name: 'name',
      label: 'label',
      value: '',
      type: 'select',
      options: [
        {
          key: 'test key',
          value: 'test value',
        },
      ],
      validators: {},
    };

    group = formBuilder.group({
      name: [''],
    });

    formGroupDirectiveSpy = spyOnProperty(formGroupDirective, 'control', 'get');
    formGroupDirectiveSpy.and.returnValue(group);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label', () => {
    const label = el.query(By.css('.label'));

    expect((label.nativeElement as HTMLElement).innerText).toBe('label');
  });

  it('should render input element with is options', async () => {
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    const selectElements = await select.getOptions();

    expect(selectElements.length).toBe(1);
    expect(await selectElements[0].getText()).toBe('test value');
  });
});
