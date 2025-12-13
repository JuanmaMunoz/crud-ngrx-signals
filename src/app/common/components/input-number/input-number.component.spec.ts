import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IInputNumber } from '../../models/interfaces';
import { InputNumberComponent } from './input-number.component';

describe('InputNumberComponent', () => {
  let component: InputNumberComponent;
  let fixture: ComponentFixture<InputNumberComponent>;
  let input!: IInputNumber;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputNumberComponent],
    }).compileComponents();

    input = {
      control: new FormControl(5000),
      placeholder: 'Insert Salary',
      label: 'Salary',
      min: 1000,
      max: 10000,
    };
    fixture = TestBed.createComponent(InputNumberComponent);
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
    expect(parseInt(inputText?.value!)).toBe(input.control.getRawValue());
  });

  it('should increase the input´s value', () => {
    const oldValue = input.control.getRawValue();
    component.increase();
    fixture.detectChanges();
    expect(component.control.value).toBe(oldValue + 1);
  });

  it('should decrease the input´s value', () => {
    const oldValue = input.control.getRawValue();
    component.decrease();
    fixture.detectChanges();
    expect(component.control.value).toBe(oldValue - 1);
  });

  it('should not increase the input´s value', () => {
    input.control.setValue(input.max);
    component.increase();
    fixture.detectChanges();
    expect(component.control.value).toBe(input.max);
  });

  it('should not decrease the input´s value', () => {
    input.control.setValue(input.min);
    component.decrease();
    fixture.detectChanges();
    expect(component.control.value).toBe(input.min);
  });
});
