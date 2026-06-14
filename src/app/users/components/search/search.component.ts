import { Component, effect, inject, input, output, signal } from '@angular/core';
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
  search = input.required<string>();
  actionSearch = output<string>();

  public searchText = signal<string>('');
  private delaySearch = 400;
  private router = inject(Router);

  private subscription = toObservable(this.searchText)
    .pipe(debounceTime(this.delaySearch), skip(1), takeUntilDestroyed())
    .subscribe((search) => {
      this.actionSearch.emit(search);
    });

  private readonly searchEffect = effect(() => {
    this.searchText.set(this.search());
  });

  public deleteSearch(): void {
    this.searchText.set('');
  }

  public createUser() {
    this.router.navigate(['/users/create']);
  }
}
