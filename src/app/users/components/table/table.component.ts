import { DatePipe } from '@angular/common';
import { Component, effect, signal, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxMaskDirective } from 'ngx-mask';
import { debounceTime, Subscription } from 'rxjs';
import { SpinnerComponent } from '../../../common/components/spinner/spinner.component';
import { IGetUsersParams, IUserDeleteState, IUsersState } from '../../models/interfaces';
import {
  deleteUser,
  deleteUserConfirm,
  getUsers,
  setInitialStateDelete,
} from '../../store/actions/users.action';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { IUser } from './../../models/interfaces';

@Component({
  selector: 'app-table',
  imports: [DatePipe, ModalDeleteComponent, FormsModule, NgxMaskDirective, SpinnerComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  public usersFromStore!: Signal<IUser[]>;
  public users = signal<IUser[]>([]);
  public totalPages!: Signal<number>;
  public params = signal<IGetUsersParams | null>(null);
  public currentPage!: Signal<number>;
  public search!: Signal<string>;
  public loading!: Signal<boolean>;
  public loadingDelete!: Signal<boolean>;
  public startDelete!: Signal<boolean>;
  public userDeleting!: Signal<IUser | null>;
  public successDelete!: Signal<boolean>;
  public openModal = signal<boolean>(false);
  public searchText = signal<string>('');
  public firstLoad: boolean = false;
  public pageText = signal<number>(1);
  private subscription = new Subscription();
  private delaySearch: number = 200;
  private numberRows: number = 10;

  constructor(
    private store: Store<{ users: IUsersState; userDelete: IUserDeleteState }>,
    private router: Router,
  ) {
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
      this.searchText.set(this.search());
    });

    effect(() => {
      this.pageText.set(this.currentPage());
    });

    effect(() => {
      if (this.successDelete()) {
        this.openModal.set(false);
        this.store.dispatch(getUsers(this.params()!));
        this.store.dispatch(setInitialStateDelete());
      }
    });

    effect(() => {
      if (this.params()) {
        this.store.dispatch(getUsers(this.params()!));
      }
    });

    effect(() => {
      if (!this.firstLoad && this.pageText()) return;
      this.params.update((params) => (params ? { ...params, page: this.pageText() } : null));
    });

    this.subscription.add(
      toObservable(this.searchText)
        .pipe(debounceTime(this.delaySearch))
        .subscribe((search) => {
          if (this.firstLoad) this.params.set({ number: this.numberRows, page: 1, search: search });
        }),
    );
  }

  ngOnInit(): void {
    this.store.dispatch(setInitialStateDelete());
    this.params.set({
      number: this.numberRows,
      search: this.search(),
      page: this.currentPage(),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public userDetail(email: string): void {
    this.router.navigate([`users/detail/`, email]);
  }

  public openModalDelete(user: IUser, event: MouseEvent): void {
    event.stopPropagation();
    this.openModal.set(true);
    this.store.dispatch(deleteUser({ user }));
  }

  public actionModalDelete(deleteUser: boolean): void {
    deleteUser ? this.store.dispatch(deleteUserConfirm()) : this.openModal.set(false);
  }

  public changePage(page: number): void {
    this.userAction(() => {
      if (page < 1) {
        page = 1;
      }
      if (page > this.totalPages()) page = this.totalPages();
      this.pageText.set(page);
    });
  }

  public nextPage(): void {
    this.userAction(() => this.pageText.update((value) => value + 1));
  }

  public previousPage(): void {
    this.userAction(() => this.pageText.update((value) => value - 1));
  }

  public changeSearh(search: string): void {
    this.userAction(() => this.searchText.set(search));
  }

  public deleteSearch(): void {
    this.userAction(() => {
      if (this.searchText) {
        this.searchText.set('');
      }
    });
  }

  private userAction(fn: () => void) {
    this.firstLoad = true;
    fn();
  }
}
