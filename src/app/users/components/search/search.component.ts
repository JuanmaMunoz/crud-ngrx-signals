import { Component, EventEmitter, Output, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output() actionSearch: EventEmitter<string> = new EventEmitter();
  @Output() actionDelete: EventEmitter<null> = new EventEmitter();
  private delaySearch: number = 200;
  private subscription = new Subscription();
  private firstSearch: boolean = false;
  constructor(private router: Router) {
    this.subscription.add(
      toObservable(this.searchText)
        .pipe(debounceTime(this.delaySearch))
        .subscribe((search) => {
          //if (this.firstLoad) this.params.set({ number: this.numberRows, page: 1, search: search });
          this.actionSearch.emit(search);
        }),
    );
  }
  public searchText = signal<string>('');

  /*public changeSearh(search: string): void {
    this.actionSearch.emit(search);
  }*/

  public deleteSearch(): void {
    this.actionDelete.emit();
  }

  public createUser() {
    this.router.navigate(['/users/create']);
  }
}
