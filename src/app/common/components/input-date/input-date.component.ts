import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IInput } from '../../models/interfaces';
import { ValidationErrors } from '../../utils/pipes/validation-errors.pipe';

@Component({
  selector: 'app-input-date',
  imports: [CommonModule, ReactiveFormsModule, ValidationErrors],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss',
})
export class InputDateComponent implements OnInit {
  input = input.required<IInput>();
  public userAgent: string = window.navigator.userAgent;
  public control!: FormControl;
  ngOnInit(): void {
    this.control = this.input().control;
  }
  public reset(): void {
    this.control.setValue('');
  }
}
