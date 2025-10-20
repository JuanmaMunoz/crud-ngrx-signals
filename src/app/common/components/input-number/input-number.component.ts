import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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

  public increase(): void {
    if (this.input().control.value < this.input().max)
      this.input().control.setValue(this.input().control.value + 1);
  }
  public decrease(): void {
    if (this.input().control.value > this.input().min)
      this.input().control.setValue(this.input().control.value - 1);
  }
}
