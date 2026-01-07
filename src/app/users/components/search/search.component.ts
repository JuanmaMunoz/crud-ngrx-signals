import {
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  Output,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, skip } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() search!: Signal<string>;
  @Output() actionSearch = new EventEmitter<string>();

  public searchText: WritableSignal<string> = signal<string>('');
  private delaySearch = 400;
  private router = inject(Router);

  private subscription = toObservable(this.searchText)
    .pipe(debounceTime(this.delaySearch), skip(1), takeUntilDestroyed())
    .subscribe((search) => {
      this.actionSearch.emit(search);
    });

  private effect = effect(() => {
    this.searchText.set(this.search());
  });

  public deleteSearch(): void {
    this.searchText.set('');
  }

  public createUser() {
    this.router.navigate(['/users/create']);
  }
}
