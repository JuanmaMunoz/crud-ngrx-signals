import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal, WritableSignal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { IInput } from '../../models/interfaces';
import { InputTextComponent } from './input-text.component';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;
  const validationErrors: Record<string, string> = {
    required: 'The field is required',
  };
  let input: IInput = {
    control: new FormControl('Juan Manuel', [Validators.required]),
    placeholder: 'Insert Name',
    label: 'Name',
    validationErrors,
    focus: true,
  };
  let inputSignal: WritableSignal<IInput> = signal(input);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextComponent, NgxMaskDirective],
      providers: [provideNgxMask()],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    component.input = inputSignal;
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

  /*it('should put focus on the input', async () => {
    inputSignal.set({ ...inputSignal(), focus: true });
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const inputText = compiled.querySelector('input');
    expect(document.activeElement).toEqual(inputText);
  });

  it('should not put focus on the input', () => {
    (document.activeElement as HTMLElement)?.blur();
    inputSignal.set({ ...inputSignal(), focus: false });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const inputText = compiled.querySelector('input');
    expect(document.activeElement).not.toEqual(inputText);
  });*/
});
