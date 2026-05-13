import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, input, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { IInput } from '../../models/interfaces';
import { ValidationErrors } from '../../utils/pipes/validation-errors.pipe';

@Component({
  selector: 'app-input-text',
  imports: [CommonModule, ReactiveFormsModule, ValidationErrors, NgxMaskDirective],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent implements AfterViewInit {
  input = input.required<IInput>();
  @ViewChild('element') element: ElementRef = {} as ElementRef;

  ngAfterViewInit(): void {
    if (this.input().focus) queueMicrotask(() => this.element.nativeElement.focus());
  }
}
