import { Component, inject, output, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { fadeIn } from '../../animations/animations';
import { IJWT, ITokenState } from '../../models/interfaces';

@Component({
  selector: 'app-navbar',
  imports: [],
  animations: [fadeIn(1000)],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  actionLogout = output<void>();
  protected imgAngular = 'assets/images/angular.svg';
  protected imgNgrx = 'assets/images/ngrx.svg';
  private store = inject(Store<{ token: ITokenState }>);

  protected jwt: Signal<IJWT | null> = toSignal(
    this.store.select((state) => state.token.jwt),
    { initialValue: null },
  );

  public logout(): void {
    this.actionLogout.emit();
  }
}
