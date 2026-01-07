import { DatePipe } from '@angular/common';
import {
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { debounceTime, filter, skip } from 'rxjs';
import { fadeIn } from '../../../common/animations/animations';
import { SpinnerComponent } from '../../../common/components/spinner/spinner.component';
import { IUser } from './../../models/interfaces';

@Component({
  selector: 'app-table',
  imports: [DatePipe, FormsModule, NgxMaskDirective, SpinnerComponent],
  animations: [fadeIn(500)],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() users!: Signal<IUser[]>;
  @Input() loading!: Signal<boolean>;
  @Input() currentPage!: Signal<number>;
  @Input() totalPages!: Signal<number>;
  @Output() actionDeleteUser = new EventEmitter<IUser>();
  @Output() actionChangePage = new EventEmitter<number>();
  public page: WritableSignal<number> = signal<number>(1);
  private delayPagination = 200;
  private router = inject(Router);

  private effect = effect(() => {
    this.page.set(this.currentPage());
  });

  private subscription = toObservable(this.page)
    .pipe(
      debounceTime(this.delayPagination),
      skip(1),
      filter(() => this.page() > 0),
      takeUntilDestroyed(),
    )
    .subscribe((page) => this.actionChangePage.emit(page));

  public userDetail(email: string): void {
    this.router.navigate([`users/detail/`, email]);
  }

  public openModalDelete(user: IUser, event: MouseEvent): void {
    event.stopPropagation();
    this.actionDeleteUser.emit(user);
  }

  public changePage(page: number): void {
    if (page > this.totalPages()) page = this.totalPages();
    this.page.set(page);
  }

  public nextPage(): void {
    if (!this.page()) this.page.set(0);
    this.page.update((value) => value + 1);
  }

  public previousPage(): void {
    this.page.update((value) => value - 1);
  }
}
