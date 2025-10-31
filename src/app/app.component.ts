import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderComponent } from './common/components/header/header.component';
import { SessionService } from './common/services/session.service';
import { ILoginState } from './login/models/interfaces';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'crud-ngrx-signals';
  public loginSuccess!: Signal<boolean>;

  constructor(
    private sessionService: SessionService,
    private store: Store<{ login: ILoginState; logout: ILoginState }>,
  ) {
    this.sessionService.checkSessionFromStorage();
    this.loginSuccess = toSignal(
      this.store.select((state) => state.login.success),
      { initialValue: false },
    );
  }
}
