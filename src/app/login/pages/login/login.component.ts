import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AboutMeComponent } from '../../../common/components/about-me/about-me.component';
import { ErrorComponent } from '../../../common/components/error/error.component';
import { InfoCrudComponent } from '../../../common/components/info-crud/info-crud.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { ILoginState } from '../../models/interfaces';
import {
  login,
  setInitialStateLogin,
  setInitialStateLogout,
} from '../../store/actions/login.action';

@Component({
  selector: 'app-login',
  imports: [CommonModule, LoginFormComponent, InfoCrudComponent, AboutMeComponent, ErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loading!: Signal<boolean>;
  public loginSuccess!: Signal<boolean>;
  public loginError!: Signal<HttpErrorResponse | null>;
  constructor(
    private store: Store<{ login: ILoginState; logout: ILoginState }>,
    private router: Router,
  ) {
    this.loading = toSignal(
      this.store.select((state) => state.login.loading),
      { initialValue: false },
    );

    this.loginSuccess = toSignal(
      this.store.select((state) => state.login.success),
      { initialValue: false },
    );

    this.loginError = toSignal(
      this.store.select((state) => state.login.error),
      { initialValue: null },
    );

    effect(() => {
      if (this.loginSuccess()) {
        this.router.navigate(['/users']);
      }
    });
  }
  ngOnInit(): void {
    this.store.dispatch(setInitialStateLogin());
    this.store.dispatch(setInitialStateLogout());
  }

  public login(credentials: { email: string; pass: string }): void {
    const { email, pass } = credentials;
    this.store.dispatch(login({ email, pass }));
  }
}
