import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BackUsersComponent } from '../../components/back-users/back-users.component';
import { IUserCreateState, IUserDetail } from '../../models/interfaces';
import { createUser, setInitialStateCreate } from '../../store/actions/users.action';
import { UserFormComponent } from './../../components/user-form/user-form.component';

@Component({
  selector: 'app-create',
  imports: [BackUsersComponent, UserFormComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  public userCreate!: Signal<IUserDetail | null>;
  public userCreateError!: Signal<HttpErrorResponse | null>;
  public userCreateLoading!: Signal<boolean>;
  public userCreateSuccess!: Signal<boolean>;
  constructor(
    private store: Store<{ userCreate: IUserCreateState }>,
    private router: Router,
  ) {
    this.userCreateLoading = toSignal(
      this.store.select((state) => state.userCreate.loading),
      { initialValue: false },
    );

    this.userCreateError = toSignal(
      this.store.select((state) => state.userCreate.error),
      { initialValue: null },
    );

    this.userCreate = toSignal(
      this.store.select((state) => state.userCreate.userDetail),
      { initialValue: null },
    );

    this.userCreateSuccess = toSignal(
      this.store.select((state) => state.userCreate.success),
      { initialValue: false },
    );

    effect(() => {
      if (this.userCreateSuccess()) {
        this.router.navigate(['/users/detail', this.userCreate()?.info.email]);
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(setInitialStateCreate());
  }

  public cancelCreation(): void {
    this.router.navigate(['/users']);
  }

  public saveCreation(userDetail: IUserDetail): void {
    this.store.dispatch(setInitialStateCreate());
    this.store.dispatch(createUser({ userDetail }));
  }
}
