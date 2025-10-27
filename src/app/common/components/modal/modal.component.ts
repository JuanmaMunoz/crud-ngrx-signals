import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';
import { fadeIn } from '../../animations/animations';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  animations: [fadeIn()],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() visible!: Signal<boolean>;
}
