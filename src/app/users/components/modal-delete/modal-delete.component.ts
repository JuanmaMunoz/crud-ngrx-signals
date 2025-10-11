import { Component, EventEmitter, Input, Output, signal, Signal } from '@angular/core';
import { ModalComponent } from '../../../common/components/modal/modal.component';
import { IUser } from '../../models/interfaces';

@Component({
  selector: 'app-modal-delete',
  imports: [ModalComponent],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss',
})
export class ModalDeleteComponent {
  @Input() userDeleting!: Signal<IUser | null>;
  @Input() openModal = signal<boolean>(false);
  @Input() loadingDelete!: Signal<boolean>;
  @Output() actionDelete: EventEmitter<boolean> = new EventEmitter();

  public cancelDeleting(): void {
    this.actionDelete.emit(false);
  }

  public confirmDeleting(): void {
    this.actionDelete.emit(true);
  }
}
