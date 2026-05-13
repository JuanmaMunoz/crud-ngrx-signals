import { Component, EventEmitter, input, Output } from '@angular/core';
import { ModalComponent } from '../../../common/components/modal/modal.component';
import { IUser } from '../../models/interfaces';

@Component({
  selector: 'app-modal-delete',
  imports: [ModalComponent],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss',
})
export class ModalDeleteComponent {
  deleteUser = input.required<IUser | null>();
  openModal = input<boolean>(false);
  deleteLoading = input.required<boolean>();
  @Output() actionDelete = new EventEmitter<boolean>();

  public cancelDeleting(): void {
    this.actionDelete.emit(false);
  }

  public confirmDeleting(): void {
    this.actionDelete.emit(true);
  }
}
