import { Component, Input, signal, WritableSignal } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-error',
  imports: [ModalComponent],
  templateUrl: './modal-error.component.html',
  styleUrl: './modal-error.component.scss',
})
export class ModalErrorComponent {
  @Input() openModal = signal<boolean>(false);
  @Input() errorMessage!: WritableSignal<string>;

  public closeModal(): void {
    this.openModal.set(false);
  }
}
