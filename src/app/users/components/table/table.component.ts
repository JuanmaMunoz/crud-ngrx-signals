import { DatePipe } from '@angular/common';
import { Component, effect, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IGetUsers, IUserDeleteState, IUsersState } from '../../models/interfaces';
import {
  deleteUser,
  deleteUserConfirm,
  getUsers,
  setInitialState,
  setInitialStateDelete,
} from '../../store/actions/users.action';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { IUser } from './../../models/interfaces';

@Component({
  selector: 'app-table',
  imports: [DatePipe, ModalDeleteComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  public usersFromStore!: Signal<IUser[]>;
  public users = signal<IUser[]>([]);
  public loading!: Signal<boolean>;
  public loadingDelete!: Signal<boolean>;
  public startDelete!: Signal<boolean>;
  public userDeleting!: Signal<IUser | null>;
  public successDelete!: Signal<boolean>;
  public openModal = signal<boolean>(false);

  constructor(
    private store: Store<{ users: IUsersState; userDelete: IUserDeleteState }>,
    private router: Router,
  ) {
    this.usersFromStore = toSignal(
      this.store.select((state) => state.users.users),
      { initialValue: [] },
    );

    this.loading = toSignal(
      this.store.select((state) => state.users.loading),
      { initialValue: false },
    );

    this.userDeleting = toSignal(
      this.store.select((state) => state.userDelete.user),
      { initialValue: null },
    );

    this.loadingDelete = toSignal(
      this.store.select((state) => state.userDelete.loading),
      { initialValue: false },
    );

    this.successDelete = toSignal(
      this.store.select((state) => state.userDelete.success),
      { initialValue: false },
    );

    effect(() => {
      this.users.set(this.usersFromStore());
    });

    effect(() => {
      this.userDeleting() ? this.openModal.set(true) : this.openModal.set(false);
    });

    effect(() => {
      if (this.successDelete()) {
        this.users.update((users) => users.filter((u) => u.email !== this.userDeleting()?.email));
        this.store.dispatch(setInitialStateDelete());
      }
    });
  }

  ngOnInit(): void {
    const data: IGetUsers = {
      page: 0,
      number: 10,
      search: '',
    };
    this.store.dispatch(setInitialState());
    this.store.dispatch(getUsers(data));
  }

  public userDetail(email: string): void {
    this.router.navigate([`users/detail/`, email]);
  }

  public openModalDelete(user: IUser, event: MouseEvent): void {
    event.stopPropagation();
    this.store.dispatch(deleteUser({ user }));
  }

  public actionModalDelete(del: boolean): void {
    del ? this.store.dispatch(deleteUserConfirm()) : this.store.dispatch(setInitialStateDelete());
  }
}
