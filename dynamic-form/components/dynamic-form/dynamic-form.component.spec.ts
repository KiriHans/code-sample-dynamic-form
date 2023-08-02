import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DynamicFormComponent } from './dynamic-form.component';
import { MOCK_FORM_DATA } from '../../mocks/mock-form-data';
import { MockDynamicFieldComponent } from '../../mocks/mock-dynamic-field';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicFormComponent, MockDynamicFieldComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.formData = { ...MOCK_FORM_DATA };

    spyOn(component, 'buildForm').and.callThrough();
    spyOn(component, 'getValidators').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call its respective methods on component's initialization", () => {
    expect(component.buildForm).toHaveBeenCalled();
    expect(component.getValidators).toHaveBeenCalled();
  });

  it("should create controls on component's initialization", () => {
    const dynamicFormControls = component.dynamicFormGroup.controls;

    expect(Object.keys(dynamicFormControls)).toEqual(
      MOCK_FORM_DATA.controls.map((control) => control.name)
    );

    Object.values(dynamicFormControls).forEach((control) => {
      expect(control).toBeInstanceOf(FormControl);
    });
  });

  it('should render correctly', () => {
    const fields = el.queryAll(By.css('app-dynamic-field'));
    const expectedLength = Object.values(MOCK_FORM_DATA.controls).length;
    const data = component.formData;

    expect(fields.length).toBe(expectedLength);
    fields.forEach((field, index) => {
      expect((field.nativeElement as HTMLElement).innerText).toBe(
        `Dynamic Field rendered, ${data.controls[index].name}, ${data.controls[index].type}`
      );
    });
  });
});
