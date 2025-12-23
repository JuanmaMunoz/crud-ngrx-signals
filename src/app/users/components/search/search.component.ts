import {
  Component,
  effect,
  EventEmitter,
  Input,
  Output,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, skip, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() search!: Signal<string>;
  @Output() actionSearch: EventEmitter<string> = new EventEmitter();

  public searchText: WritableSignal<string> = signal<string>('');
  private delaySearch: number = 400;
  private subscription = new Subscription();

  constructor(private router: Router) {
    this.subscription.add(
      toObservable(this.searchText)
        .pipe(debounceTime(this.delaySearch), skip(1))
        .subscribe((search) => {
          this.actionSearch.emit(search);
        }),
    );

    effect(() => {
      this.searchText.set(this.search());
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public deleteSearch(): void {
    this.searchText.set('');
  }

  public createUser() {
    this.router.navigate(['/users/create']);
  }
}
