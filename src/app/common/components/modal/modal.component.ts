import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { fadeInModal } from '../../animations/animations';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  animations: [fadeInModal(150)],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  visible = input.required<boolean>();
}
