import { Component, effect, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAuthState } from '../../models/interfaces';
import { logout } from '../../store/actions/auth.action';
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
  public logoutSuccess!: Signal<boolean>;

  constructor(
    private router: Router,
    private store: Store<{ login: IAuthState; logout: IAuthState }>,
  ) {
    this.loginSuccess = toSignal(
      this.store.select((state) => state.login.success),
      { initialValue: false },
    );

    this.logoutSuccess = toSignal(
      this.store.select((state) => state.logout.success),
      { initialValue: false },
    );

    effect(() => {
      if (this.logoutSuccess()) {
        this.router.navigate(['/login']);
      }
    });
  }

  public logout(): void {
    this.store.dispatch(logout());
  }
}
