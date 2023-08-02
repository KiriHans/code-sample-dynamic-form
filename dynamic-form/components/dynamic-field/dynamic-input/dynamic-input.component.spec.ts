import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

import { DynamicInputComponent } from './dynamic-input.component';

describe('DynamicInputComponent', () => {
  let component: DynamicInputComponent;
  let fixture: ComponentFixture<DynamicInputComponent>;
  let el: DebugElement;

  let formBuilder: FormBuilder;
  let formGroupDirective: FormGroupDirective;
  let formGroupDirectiveSpy: jasmine.Spy<(this: FormGroupDirective) => FormGroup<object>>;

  let group: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicInputComponent],
      imports: [NoopAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
      providers: [FormBuilder, FormGroupDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicInputComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    formBuilder = TestBed.inject(FormBuilder);
    formGroupDirective = TestBed.inject(FormGroupDirective);

    component.control = {
      name: 'name',
      label: 'label',
      value: '',
      type: 'text',
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

  it('should render input element', () => {
    const input = el.query(By.css('.input'));

    expect((input.nativeElement as HTMLInputElement).type).toBe('text');
  });
});
