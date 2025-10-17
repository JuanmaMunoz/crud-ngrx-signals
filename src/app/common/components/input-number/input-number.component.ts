import { Component, Input, Signal } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';
import { IInputNumber } from '../../models/interfaces';

@Component({
  selector: 'app-input-number',
  imports: [NgxMaskDirective],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
})
export class InputNumberComponent {
  @Input() input!: Signal<IInputNumber>;

  public increase(): void {}

  public decrease(): void {}
}
