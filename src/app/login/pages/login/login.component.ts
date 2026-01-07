import { Component, effect, inject, OnInit, Signal } from '@angular/core';
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
export class LoginComponent implements OnInit {
  private store = inject(Store<{ login: IAuthState }>);
  private router = inject(Router);

  public loading: Signal<boolean> = toSignal(
    this.store.select((state) => state.login.loading),
    { initialValue: false },
  );

  public loginSuccess: Signal<boolean> = toSignal(
    this.store.select((state) => state.login.success),
    { initialValue: false },
  );

  private effect = effect(() => {
    if (this.loginSuccess()) {
      this.router.navigate(['/users']);
    }
  });

  ngOnInit(): void {
    this.store.dispatch(setInitialStateLogout());
  }

  public login(credentials: { email: string; pass: string }): void {
    const { email, pass } = credentials;
    this.store.dispatch(login({ email, pass }));
  }
}
