import { CommonModule } from '@angular/common';
import { Component, effect, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { LogoComponent } from './common/components/logo/logo.component';
import { NavbarComponent } from './common/components/navbar/navbar.component';
import { SessionService } from './common/services/session.service';
import { ILoginState } from './login/models/interfaces';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LogoComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'crud-ngrx-signals';
  public loginSuccess!: Signal<boolean>;
  public logoutSuccess!: Signal<boolean>;

  constructor(
    private sessionService: SessionService,
    private store: Store<{ login: ILoginState; logout: ILoginState }>,
    private router: Router,
  ) {
    this.sessionService.checkSessionFromStorage();
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
}
