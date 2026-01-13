import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, OnInit, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { scaleFadeIn } from './common/animations/animations';
import { ErrorComponent } from './common/components/error/error.component';
import { HeaderComponent } from './common/components/header/header.component';
import { ModalErrorComponent } from './common/components/modal-error/modal-error.component';
import { SpinnerComponent } from './common/components/spinner/spinner.component';
import { IAuthState, IMessageState, ITokenState } from './common/models/interfaces';
import { SessionService } from './common/services/session.service';
import { logout } from './common/store/actions/auth.action';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    ModalErrorComponent,
    ErrorComponent,
    SpinnerComponent,
  ],
  animations: [scaleFadeIn(500)],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public errorMessage = signal<string>('');
  public showErrorModal = signal<boolean>(false);

  private sessionService = inject(SessionService);
  private store = inject(Store<{ login: IAuthState; token: ITokenState; message: IMessageState }>);

  ngOnInit(): void {
    this.sessionService.checkSessionFromStorage();
  }

  public loginSuccess: Signal<boolean> = toSignal(
    this.store.select((state) => state.login.success),
    { initialValue: false },
  );

  public tokenError: Signal<HttpErrorResponse | null> = toSignal(
    this.store.select((state) => state.token.error),
    { initialValue: null },
  );

  public messageError: Signal<string | null> = toSignal(
    this.store.select((state) => state.message.message),
    { initialValue: null },
  );

  private effect = effect(() => {
    if (this.tokenError()) {
      this.showErrorModal.set(true);
      this.store.dispatch(logout());
      this.errorMessage.set(this.tokenError()?.error.message);
    }
  });
}
