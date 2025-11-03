import { Component, EventEmitter, Output, Signal } from '@angular/core';
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
  @Output() actionLogout: EventEmitter<null> = new EventEmitter();
  public imgAngular: string = 'assets/images/angular.svg';
  public imgNgrx: string = 'assets/images/ngrx.svg';
  public jwt!: Signal<IJWT | null>;

  constructor(private store: Store<{ token: ITokenState }>) {
    this.jwt = toSignal(
      this.store.select((state) => state.token.jwt),
      { initialValue: null },
    );
  }

  public logout(): void {
    this.actionLogout.emit();
  }
}
