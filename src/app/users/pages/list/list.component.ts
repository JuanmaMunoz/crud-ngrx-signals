import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ModalDeleteComponent } from '../../components/modal-delete/modal-delete.component';
import { SearchComponent } from '../../components/search/search.component';
import { TableComponent } from '../../components/table/table.component';
import { IGetUsersParams, IUser, IUserDeleteState, IUsersState } from '../../models/interfaces';
import {
  deleteUser,
  deleteUserConfirm,
  getUsers,
  setInitialStateDelete,
} from '../../store/actions/users.action';
import { ErrorComponent } from './../../../common/components/error/error.component';

@Component({
  selector: 'app-list',
  imports: [TableComponent, SearchComponent, ErrorComponent, ModalDeleteComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  public usersFromStore!: Signal<IUser[]>;
  public users = signal<IUser[]>([]);
  public totalPages!: Signal<number>;
  public params = signal<IGetUsersParams | null>(null);
  public currentPage!: Signal<number>;
  public search!: Signal<string>;
  public loadingUsers!: Signal<boolean>;
  public errorUsers!: Signal<HttpErrorResponse | null>;
  public deleteLoading!: Signal<boolean>;
  public startDelete!: Signal<boolean>;
  public deleteUser!: Signal<IUser | null>;
  public successDelete!: Signal<boolean>;
  public errorDelete!: Signal<HttpErrorResponse | null>;
  public openModal = signal<boolean>(false);
  private numberRows: number = 10;

  constructor(private store: Store<{ users: IUsersState; userDelete: IUserDeleteState }>) {
    this.usersFromStore = toSignal(
      this.store.select((state) => state.users.users),
      { initialValue: [] },
    );

    this.totalPages = toSignal(
      this.store.select((state) => state.users.totalPages),
      { initialValue: 0 },
    );

    this.search = toSignal(
      this.store.select((state) => state.users.search),
      { initialValue: '' },
    );

    this.currentPage = toSignal(
      this.store.select((state) => state.users.page),
      { initialValue: 1 },
    );

    this.loadingUsers = toSignal(
      this.store.select((state) => state.users.loading),
      { initialValue: false },
    );

    this.errorUsers = toSignal(
      this.store.select((state) => state.users.error),
      { initialValue: null },
    );

    this.deleteUser = toSignal(
      this.store.select((state) => state.userDelete.user),
      { initialValue: null },
    );

    this.deleteLoading = toSignal(
      this.store.select((state) => state.userDelete.loading),
      { initialValue: false },
    );

    this.successDelete = toSignal(
      this.store.select((state) => state.userDelete.success),
      { initialValue: false },
    );

    this.errorDelete = toSignal(
      this.store.select((state) => state.userDelete.error),
      { initialValue: null },
    );

    effect(() => {
      this.users.set(this.usersFromStore());
    });

    effect(() => {
      if (this.successDelete()) {
        this.openModal.set(false);
        this.store.dispatch(setInitialStateDelete());
        this.store.dispatch(getUsers(this.params()!));
      }
    });

    effect(() => {
      if (this.errorDelete()) {
        this.openModal.set(false);
      }
    });

    effect(() => {
      if (this.params()) {
        this.store.dispatch(getUsers(this.params()!));
      }
    });
  }

  ngOnInit(): void {
    this.params.set({
      number: this.numberRows,
      search: this.search(),
      page: this.currentPage(),
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(setInitialStateDelete());
  }

  public openModalDelete(user: IUser): void {
    this.openModal.set(true);
    this.store.dispatch(deleteUser({ user }));
  }

  public actionModalDelete(deleteUser: boolean): void {
    if (deleteUser) {
      this.store.dispatch(deleteUserConfirm());
    } else {
      this.openModal.set(false);
      this.store.dispatch(setInitialStateDelete());
    }
  }

  public changePage(page: number): void {
    this.params.update(() => ({ ...this.params()!, page }));
  }

  public searchUsers(search: string): void {
    this.params.update(() => ({ ...this.params()!, search, page: 1 }));
  }
}
