import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ErrorComponent } from './common/components/error/error.component';
import { HeaderComponent } from './common/components/header/header.component';
import { ModalErrorComponent } from './common/components/modal-error/modal-error.component';
import { IMessageState, ITokenState } from './common/models/interfaces';
import { SessionService } from './common/services/session.service';
import { logout } from './common/store/actions/auth.action';
import { IAuthState } from './login/models/interfaces';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent, ModalErrorComponent, ErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'crud-ngrx-signals';
  public loginSuccess!: Signal<boolean>;
  public tokenError!: Signal<HttpErrorResponse | null>;
  public errorMessage = signal<string>('');
  public showErrorModal = signal<boolean>(false);
  public messageError!: Signal<string | null>;

  constructor(
    private sessionService: SessionService,
    private store: Store<{ login: IAuthState; token: ITokenState; message: IMessageState }>,
  ) {
    this.sessionService.checkSessionFromStorage();

    this.loginSuccess = toSignal(
      this.store.select((state) => state.login.success),
      { initialValue: false },
    );

    this.tokenError = toSignal(
      this.store.select((state) => state.token.error),
      { initialValue: null },
    );

    this.messageError = toSignal(
      this.store.select((state) => state.message.message),
      { initialValue: null },
    );

    effect(() => {
      if (this.tokenError()) {
        this.showErrorModal.set(true);
        this.store.dispatch(logout());
        this.errorMessage.set(this.tokenError()?.error.message);
      }
    });
  }
}
