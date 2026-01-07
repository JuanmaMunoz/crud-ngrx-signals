import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
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

@Component({
  selector: 'app-list',
  imports: [TableComponent, SearchComponent, ModalDeleteComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, OnDestroy {
  public users: WritableSignal<IUser[]> = signal<IUser[]>([]);
  public params: WritableSignal<IGetUsersParams | null> = signal<IGetUsersParams | null>(null);
  public startDelete!: Signal<boolean>;
  public openModal: WritableSignal<boolean> = signal<boolean>(false);
  private numberRows = 10;
  private store = inject(Store<{ users: IUsersState; userDelete: IUserDeleteState }>);

  public usersFromStore: Signal<IUser[]> = toSignal(
    this.store.select((state) => state.users.users),
    { initialValue: [] },
  );

  public totalPages: Signal<number> = toSignal(
    this.store.select((state) => state.users.totalPages),
    { initialValue: 0 },
  );

  public search: Signal<string> = toSignal(
    this.store.select((state) => state.users.search),
    { initialValue: '' },
  );

  public currentPage: Signal<number> = toSignal(
    this.store.select((state) => state.users.page),
    { initialValue: 1 },
  );

  public loadingUsers: Signal<boolean> = toSignal(
    this.store.select((state) => state.users.loading),
    { initialValue: false },
  );

  public deleteUser: Signal<IUser | null> = toSignal(
    this.store.select((state) => state.userDelete.user),
    { initialValue: null },
  );

  public deleteLoading: Signal<boolean> = toSignal(
    this.store.select((state) => state.userDelete.loading),
    { initialValue: false },
  );

  public successDelete: Signal<boolean> = toSignal(
    this.store.select((state) => state.userDelete.success),
    { initialValue: false },
  );

  public errorDelete: Signal<HttpErrorResponse | null> = toSignal(
    this.store.select((state) => state.userDelete.error),
    { initialValue: null },
  );

  private usersEffect = effect(() => {
    this.users.set(this.usersFromStore());
  });

  private successDeleteEffect = effect(() => {
    if (this.successDelete()) {
      this.openModal.set(false);
      this.store.dispatch(setInitialStateDelete());
      this.store.dispatch(getUsers(this.params()!));
    }
  });

  private errorDeleteEffect = effect(() => {
    if (this.errorDelete()) {
      this.openModal.set(false);
    }
  });

  private paramsEffect = effect(() => {
    if (this.params()) {
      this.store.dispatch(getUsers(this.params()!));
    }
  });

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
    this.store.dispatch(setInitialStateDelete());
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
