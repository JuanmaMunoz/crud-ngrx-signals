import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IInput } from '../../models/interfaces';
import { InputDateComponent } from './input-date.component';

describe('InputDateComponent', () => {
  let component: InputDateComponent;
  let fixture: ComponentFixture<InputDateComponent>;
  const date = new Date().toISOString().split('T')[0];
  const validationErrors: Record<string, string> = {
    required: 'The field is required',
  };
  const input: IInput = {
    control: new FormControl(date, [Validators.required]),
    placeholder: 'Insert Date',
    label: 'Date',
    validationErrors,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputDateComponent);
    component = fixture.componentInstance;
    component.input = signal(input);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label and input with content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const label = compiled.querySelector('label');
    expect(label?.textContent).toContain(input.label);
    const inputText = compiled.querySelector('input');
    expect(inputText?.value).toBe(input.control.getRawValue());
  });

  it('should render validation´s error to click reset', () => {
    component.reset();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const validation = compiled.querySelector('.invalid-feedback');
    expect(validation?.textContent).toContain(validationErrors['required']);
  });
});
