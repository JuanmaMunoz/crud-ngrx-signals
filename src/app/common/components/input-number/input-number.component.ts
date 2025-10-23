import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { IInputNumber } from '../../models/interfaces';

@Component({
  selector: 'app-input-number',
  imports: [NgxMaskDirective, CommonModule, ReactiveFormsModule],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
})
export class InputNumberComponent {
  @Input() input!: Signal<IInputNumber>;
  public control!: FormControl;
  ngOnInit(): void {
    this.control = this.input().control;
    this.control.disable();
  }

  public increase(): void {
    if (this.control.value < this.input().max) this.control.setValue(this.control.value + 1);
  }
  public decrease(): void {
    if (this.control.value > this.input().min) this.control.setValue(this.control.value - 1);
  }
}
