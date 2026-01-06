import { Component, effect, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { fadeAndOut } from '../../animations/animations';
import { IMessageState } from '../../models/interfaces';
import { setInitialStateMessage } from '../../store/actions/message.action';
const timeDuration = 3000;
@Component({
  selector: 'app-error',
  imports: [],
  animations: [fadeAndOut(timeDuration)],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  public messageError!: Signal<string | null>;
  constructor(private store: Store<{ message: IMessageState }>) {
    this.messageError = toSignal(
      this.store.select((state) => state.message.message),
      { initialValue: null },
    );
    effect(() => {
      if (this.messageError()) {
        setTimeout(() => {
          this.store.dispatch(setInitialStateMessage());
        }, timeDuration + 1000);
      }
    });
  }
}
