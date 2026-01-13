import { Component, effect, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { inAndOut } from '../../animations/animations';
import { IMessageState } from '../../models/interfaces';
import { setInitialStateMessage } from '../../store/actions/message.action';
const timeDuration = 3000;
@Component({
  selector: 'app-error',
  imports: [],
  animations: [inAndOut(timeDuration)],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  private store = inject(Store<{ message: IMessageState }>);

  public messageError: Signal<string | null> = toSignal(
    this.store.select((state) => state.message.message),
    { initialValue: null },
  );

  private effect = effect(() => {
    if (this.messageError()) {
      setTimeout(() => {
        this.store.dispatch(setInitialStateMessage());
      }, timeDuration + 1000);
    }
  });
}
