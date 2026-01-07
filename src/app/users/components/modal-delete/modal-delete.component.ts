import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ModalComponent } from '../../../common/components/modal/modal.component';
import { IUser } from '../../models/interfaces';

@Component({
  selector: 'app-modal-delete',
  imports: [ModalComponent],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss',
})
export class ModalDeleteComponent {
  @Input() deleteUser!: Signal<IUser | null>;
  @Input() openModal: WritableSignal<boolean> = signal<boolean>(false);
  @Input() deleteLoading!: Signal<boolean>;
  @Output() actionDelete = new EventEmitter<boolean>();

  public cancelDeleting(): void {
    this.actionDelete.emit(false);
  }

  public confirmDeleting(): void {
    this.actionDelete.emit(true);
  }
}
