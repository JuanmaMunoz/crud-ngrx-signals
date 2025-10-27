import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ILoginState } from '../../../login/models/interfaces';
import { logout, setInitialStateLogout } from '../../../login/store/actions/login.action';
import { IToken, ITokenState } from '../../models/interfaces';
import { ModalErrorComponent } from '../modal-error/modal-error.component';

@Component({
  selector: 'app-navbar',
  imports: [ModalErrorComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public imgAngular: string = 'assets/images/angular.svg';
  public imgNgrx: string = 'assets/images/ngrx.svg';
  public token!: Signal<IToken | null>;
  public logoutSuccess!: Signal<boolean>;
  public logoutError!: Signal<HttpErrorResponse | null>;
  public showErrorModal = signal<boolean>(false);
  public errorMessage = signal<string>('');
  constructor(
    private store: Store<{ token: ITokenState; logout: ILoginState; login: ILoginState }>,
    private router: Router,
  ) {
    this.token = toSignal(
      this.store.select((state) => state.token.jwt),
      { initialValue: null },
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
      if (this.logoutSuccess()) {
        this.router.navigate(['/login']);
      }
    });

    effect(() => {
      if (this.logoutError()) {
        this.errorMessage.set(this.logoutError()?.error.message);
        this.showErrorModal.set(true);
      }
    });
  }

  public logout(): void {
    this.store.dispatch(setInitialStateLogout());
    this.store.dispatch(logout());
  }
}
