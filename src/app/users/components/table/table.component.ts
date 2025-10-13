import { DatePipe } from '@angular/common';
import { Component, effect, ElementRef, signal, Signal, ViewChild } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxMaskDirective } from 'ngx-mask';
import { debounceTime, Subscription } from 'rxjs';
import { IGetUsers, IUserDeleteState, IUsersState } from '../../models/interfaces';
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
  imports: [DatePipe, ModalDeleteComponent, FormsModule, NgxMaskDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @ViewChild('page') inputPage!: ElementRef;
  public usersFromStore!: Signal<IUser[]>;
  public users = signal<IUser[]>([]);
  public totalPages!: Signal<number>;
  public params = signal<IGetUsers>({ page: 0, number: 10, search: '' });
  public currentPage!: Signal<number>;
  public search!: Signal<string>;
  public loading!: Signal<boolean>;
  public loadingDelete!: Signal<boolean>;
  public startDelete!: Signal<boolean>;
  public userDeleting!: Signal<IUser | null>;
  public successDelete!: Signal<boolean>;
  public openModal = signal<boolean>(false);
  public searchText: string = '';
  public pageText: number = 1;
  private subscription = new Subscription();

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
      this.searchText = this.search();
    });

    effect(() => {
      this.pageText = this.currentPage();
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

    this.subscription.add(
      toObservable(this.params)
        .pipe(debounceTime(500))
        .subscribe((data) => this.store.dispatch(getUsers(data))),
    );
  }

  ngOnInit(): void {
    this.params.update((params) => ({
      ...params,
      search: this.search(),
      page: this.currentPage(),
    }));
  }

  public userDetail(email: string): void {
    this.router.navigate([`users/detail/`, email]);
  }

  public openModalDelete(user: IUser, event: MouseEvent): void {
    event.stopPropagation();
    this.store.dispatch(deleteUser({ user }));
  }

  public actionModalDelete(deleteUser: boolean): void {
    deleteUser
      ? this.store.dispatch(deleteUserConfirm())
      : this.store.dispatch(setInitialStateDelete());
  }

  public changePage(): void {
    if (this.pageText < 1) {
      this.pageText = 1;
    }
    if (this.pageText > this.totalPages()) this.pageText = this.totalPages();
    this.params.update((params) => ({ ...params, page: this.pageText }));
  }

  public nextPage(): void {
    this.pageText++;
    this.changePage();
  }

  public previousPage(): void {
    this.pageText--;
    this.changePage();
  }

  public changeSearh(): void {
    this.params.update((params) => ({ ...params, page: 1, search: this.searchText }));
  }
}
