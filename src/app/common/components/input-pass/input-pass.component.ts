import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeInput } from '../../models/enum';
import { IInput } from '../../models/interfaces';
import { ValidationErrors } from '../../utils/pipes/validation-errors.pipe';

@Component({
  selector: 'app-input-pass',
  imports: [CommonModule, ReactiveFormsModule, ValidationErrors],
  templateUrl: './input-pass.component.html',
  styleUrl: './input-pass.component.scss',
})
export class InputPassComponent {
  @Input() input = signal<IInput>({} as IInput);
  public enumTypeInput = TypeInput;
  public type = TypeInput.PASS;
  public showPass(): void {
    this.type = this.type === TypeInput.TEXT ? TypeInput.PASS : TypeInput.TEXT;
  }
}
