import { Component, input, model } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-error',
  imports: [ModalComponent],
  templateUrl: './modal-error.component.html',
  styleUrl: './modal-error.component.scss',
})
export class ModalErrorComponent {
  openModal = model<boolean>(false);
  errorMessage = input.required<string>();

  public closeModal(): void {
    this.openModal.set(false);
  }
}
