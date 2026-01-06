import { Component, effect, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AboutMeComponent } from '../../../common/components/about-me/about-me.component';
import { InfoCrudComponent } from '../../../common/components/info-crud/info-crud.component';
import { SpinnerComponent } from '../../../common/components/spinner/spinner.component';
import { IAuthState } from '../../../common/models/interfaces';
import { login, setInitialStateLogout } from '../../../common/store/actions/auth.action';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, InfoCrudComponent, AboutMeComponent, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loading!: Signal<boolean>;
  public loginSuccess!: Signal<boolean>;
  constructor(
    private store: Store<{ login: IAuthState }>,
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

    effect(() => {
      if (this.loginSuccess()) {
        this.router.navigate(['/users']);
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(setInitialStateLogout());
  }

  public login(credentials: { email: string; pass: string }): void {
    const { email, pass } = credentials;
    this.store.dispatch(login({ email, pass }));
  }
}
