import { Component, EventEmitter, inject, Output, Signal } from '@angular/core';
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
  @Output() actionLogout = new EventEmitter<void>();
  public imgAngular = 'assets/images/angular.svg';
  public imgNgrx = 'assets/images/ngrx.svg';
  private store = inject(Store<{ token: ITokenState }>);

  public jwt: Signal<IJWT | null> = toSignal(
    this.store.select((state) => state.token.jwt),
    { initialValue: null },
  );

  public logout(): void {
    this.actionLogout.emit();
  }
}
