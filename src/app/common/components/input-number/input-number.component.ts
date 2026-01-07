import { Component, Input, OnInit, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IInputNumber } from '../../models/interfaces';

@Component({
  selector: 'app-input-number',
  imports: [ReactiveFormsModule],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
})
export class InputNumberComponent implements OnInit {
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
