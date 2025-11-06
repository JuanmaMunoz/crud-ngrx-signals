import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IInput } from '../../models/interfaces';
import { InputPassComponent } from './input-pass.component';

fdescribe('InputPassComponent', () => {
  let component: InputPassComponent;
  let fixture: ComponentFixture<InputPassComponent>;
  const validationErrors: Record<string, string> = {
    required: 'The field is required',
  };
  const input: IInput = {
    control: new FormControl('xxxxxxx', [Validators.required]),
    placeholder: 'Insert Password',
    label: 'Password',
    validationErrors,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPassComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputPassComponent);
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
    const inputPass = compiled.querySelector('input');
    expect(inputPass?.value).toBe(input.control.getRawValue());
  });

  it('should render validation´s error to clear input', () => {
    input.control.setValue('');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const validation = compiled.querySelector('.invalid-feedback');
    expect(validation?.textContent).toContain(validationErrors['required']);
  });

  it('should change input´s type to click button', () => {
    component.showPass();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const inputPass = compiled.querySelector('input');
    expect(inputPass?.type).toBe('text');
    component.showPass();
    fixture.detectChanges();
    expect(inputPass?.type).toBe('password');
  });
});
