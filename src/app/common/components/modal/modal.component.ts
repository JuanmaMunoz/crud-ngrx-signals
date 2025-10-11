import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() visible!: Signal<boolean>;
}
