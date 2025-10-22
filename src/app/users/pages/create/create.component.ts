import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ErrorComponent } from '../../../common/components/error/error.component';
import { BackUsersComponent } from '../../components/back-users/back-users.component';
import { IUserCreateState, IUserDetail } from '../../models/interfaces';
import { UserFormComponent } from './../../components/user-form/user-form.component';

@Component({
  selector: 'app-create',
  imports: [BackUsersComponent, UserFormComponent, ErrorComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  public userCreate = signal<IUserDetail | null>(null);
  public userCreateError!: Signal<HttpErrorResponse | null>;
  public userCreateLoading!: Signal<boolean>;
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
  }

  public cancelCreation(): void {}

  public saveCreation(userDetail: IUserDetail): void {}
}
