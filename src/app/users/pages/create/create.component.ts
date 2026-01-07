import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, OnDestroy, Signal } from '@angular/core';
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
export class CreateComponent implements OnDestroy {
  private store = inject(Store<{ userCreate: IUserCreateState }>);
  private router = inject(Router);

  public userCreateLoading: Signal<boolean> = toSignal(
    this.store.select((state) => state.userCreate.loading),
    { initialValue: false },
  );

  public userCreateError: Signal<HttpErrorResponse | null> = toSignal(
    this.store.select((state) => state.userCreate.error),
    { initialValue: null },
  );

  public userCreate: Signal<IUserDetail | null> = toSignal(
    this.store.select((state) => state.userCreate.userDetail),
    { initialValue: null },
  );

  public userCreateSuccess: Signal<boolean> = toSignal(
    this.store.select((state) => state.userCreate.success),
    { initialValue: false },
  );

  private effect = effect(() => {
    if (this.userCreateSuccess()) {
      this.router.navigate(['/users/detail', this.userCreate()?.info.email]);
    }
  });

  ngOnDestroy(): void {
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
