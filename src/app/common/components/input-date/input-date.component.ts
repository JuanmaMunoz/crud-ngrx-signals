import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { IInput } from '../../models/interfaces';
import { ValidationErrors } from '../../utils/pipes/validation-errors.pipe';

@Component({
  selector: 'app-input-date',
  imports: [CommonModule, ReactiveFormsModule, ValidationErrors, NgxMaskDirective],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss',
})
export class InputDateComponent {
  @Input() input!: Signal<IInput>;
  public userAgent: string = window.navigator.userAgent;
  public control!: FormControl;
  ngOnInit(): void {
    this.control = this.input().control;
  }
  reset(): void {
    this.control.setValue('');
  }
}
