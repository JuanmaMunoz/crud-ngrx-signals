import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ILoginState } from '../../../login/models/interfaces';
import { logout, setInitialStateLogout } from '../../../login/store/actions/login.action';
import { LogoComponent } from '../logo/logo.component';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-header',
  imports: [NavbarComponent, LogoComponent, ModalErrorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public loginSuccess!: Signal<boolean>;
  public logoutSuccess!: Signal<boolean>;
  public logoutError!: Signal<HttpErrorResponse | null>;
  public showErrorModal = signal<boolean>(false);
  public errorMessage = signal<string>('');

  constructor(
    private store: Store<{ login: ILoginState; logout: ILoginState }>,
    private router: Router,
  ) {
    this.loginSuccess = toSignal(
      this.store.select((state) => state.login.success),
      { initialValue: false },
    );

    this.logoutSuccess = toSignal(
      this.store.select((state) => state.logout.success),
      { initialValue: false },
    );

    this.logoutError = toSignal(
      this.store.select((state) => state.logout.error),
      { initialValue: null },
    );
    effect(() => {
      if (this.logoutError()) {
        this.errorMessage.set(this.logoutError()?.error.message);
        this.showErrorModal.set(true);
      }
    });

    effect(() => {
      if (this.logoutSuccess()) {
        this.router.navigate(['/login']);
      }
    });
  }

  public logout(): void {
    this.store.dispatch(setInitialStateLogout());
    this.store.dispatch(logout());
  }
}
