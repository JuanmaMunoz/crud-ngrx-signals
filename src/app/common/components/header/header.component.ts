import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ILoginState } from '../../../login/models/interfaces';
import { logout, setInitialStateLogout } from '../../../login/store/actions/login.action';
import { LogoComponent } from '../logo/logo.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-header',
  imports: [NavbarComponent, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public loginSuccess!: Signal<boolean>;

  constructor(private store: Store<{ login: ILoginState; logout: ILoginState }>) {
    this.loginSuccess = toSignal(
      this.store.select((state) => state.login.success),
      { initialValue: false },
    );
  }

  public logout(): void {
    this.store.dispatch(setInitialStateLogout());
    this.store.dispatch(logout());
  }
}
