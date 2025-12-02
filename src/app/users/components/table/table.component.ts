import { DatePipe } from '@angular/common';
import { Component, effect, EventEmitter, Input, Output, signal, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { debounceTime, filter, skip, Subscription } from 'rxjs';
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
  @Output() actionDeleteUser: EventEmitter<IUser> = new EventEmitter();
  @Output() actionChangePage: EventEmitter<number> = new EventEmitter();
  public page = signal<number>(1);
  private subscription = new Subscription();
  private delayPagination: number = 200;
  constructor(private router: Router) {
    this.subscription.add(
      toObservable(this.page)
        .pipe(
          debounceTime(this.delayPagination),
          skip(1),
          filter(() => this.page() > 0),
        )
        .subscribe((page) => this.actionChangePage.emit(page)),
    );

    effect(() => {
      this.page.set(this.currentPage());
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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
