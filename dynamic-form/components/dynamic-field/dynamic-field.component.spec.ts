import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { By } from '@angular/platform-browser';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

import { DynamicFieldComponent } from './dynamic-field.component';
import { MockDynamicInputComponent } from '../../mocks/mock-dynamic-input-field';
import { MockDynamicSelectComponent } from '../../mocks/mock-dynamic-select-field';
import { MockDynamicSelectWithValueComponent } from '../../mocks/mock-dynamic-select-with-value-field';

describe('DynamicFieldComponent', () => {
  let component: DynamicFieldComponent;
  let fixture: ComponentFixture<DynamicFieldComponent>;
  let el: DebugElement;

  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DynamicFieldComponent,
        MockDynamicInputComponent,
        MockDynamicSelectComponent,
        MockDynamicSelectWithValueComponent,
      ],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder, FormGroupDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFieldComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    formBuilder = TestBed.inject(FormBuilder);
  });

  describe('when input controls is given', () => {
    beforeEach(() => {
      component.control = {
        name: 'name',
        label: 'label',
        value: '',
        type: 'text',
        validators: {},
      };
      component.formName = formBuilder.group({
        name: [''],
      });

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should only render the dynamic input field', () => {
      const dynamicInput = el.query(By.css('app-dynamic-input'));
      const dynamicField = el.queryAll(By.css('.field'));

      expect(dynamicInput.nativeElement.innerText).toBe('Dynamic Input rendered, name, text');
      expect(dynamicField.length).toBe(1);
    });
  });

  describe('when select/dropdown controls is given', () => {
    beforeEach(() => {
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
      component.formName = formBuilder.group({
        name: [''],
      });

      fixture.detectChanges();
    });

    it('should only render the dynamic select field', () => {
      const dynamicSelect = el.query(By.css('app-dynamic-select'));
      const dynamicField = el.queryAll(By.css('.field'));

      expect(dynamicSelect.nativeElement.innerText).toBe('Dynamic Select rendered, name, select');
      expect(dynamicField.length).toBe(1);
    });
  });

  describe('when select with additional comment controls is given', () => {
    beforeEach(() => {
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
      component.formName = formBuilder.group({
        name: formBuilder.group({
          value: '',
          additionalComment: '',
        }),
      });

      fixture.detectChanges();
    });

    it('should only render the dynamic select with value field', () => {
      const dynamicSelect = el.query(By.css('app-dynamic-select-with-value'));
      const dynamicField = el.queryAll(By.css('.field'));

      expect(dynamicSelect.nativeElement.innerText).toBe(
        'Dynamic Select with value rendered, name, select_with_comment'
      );

      expect(dynamicField.length).toBe(1);
    });
  });
});
