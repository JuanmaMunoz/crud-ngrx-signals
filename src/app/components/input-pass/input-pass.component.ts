import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeInput } from '../../models/enums';
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
  public showPass(): void {
    const inputType: TypeInput =
      this.input().type === TypeInput.TEXT ? TypeInput.PASS : TypeInput.TEXT;
    this.input.update((data) => ({ ...data, type: inputType }));
  }
}
