import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { IInput } from '../../models/interfaces';
import { InputTextComponent } from './input-text.component';

fdescribe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;
  let input!: IInput;
  const validationErrors: Record<string, string> = {
    required: 'The field is required',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextComponent, NgxMaskDirective],
      providers: [provideNgxMask()],
    }).compileComponents();

    input = {
      control: new FormControl('Juan Manuel', [Validators.required]),
      placeholder: 'Insert Name',
      label: 'Name',
      validationErrors,
      focus: true,
    };
    fixture = TestBed.createComponent(InputTextComponent);
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

  it('should render validation´s error to clear input', () => {
    input.control.setValue('');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const validation = compiled.querySelector('.invalid-feedback');
    expect(validation?.textContent).toContain(validationErrors['required']);
  });

  it('should put focus on the input', async () => {
    await fixture.whenStable(); // wait queueMicrotask
    const compiled = fixture.nativeElement as HTMLElement;
    const inputText = compiled.querySelector('input');
    expect(document.activeElement).toBe(inputText);
  });

  it('should not put focus on the input', () => {
    (document.activeElement as HTMLElement)?.blur();
    input = { ...input, focus: false };
    component.input = signal(input);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const inputText = compiled.querySelector('input');
    expect(document.activeElement).not.toEqual(inputText);
  });
});
