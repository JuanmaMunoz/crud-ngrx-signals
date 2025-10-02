import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, Signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IInput } from '../../models/interfaces';
import { ValidationErrors } from '../../utils/pipes/validation-errors.pipe';

@Component({
  selector: 'app-input-text',
  imports: [CommonModule, ReactiveFormsModule, ValidationErrors],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent {
  @Input() input!: Signal<IInput>;
  @ViewChild('element') element: ElementRef = {} as ElementRef;

  ngAfterViewInit(): void {
    if (this.input().focus) this.element.nativeElement.focus();
  }
}
