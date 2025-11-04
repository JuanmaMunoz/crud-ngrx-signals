import { DatePipe } from '@angular/common';
import { Component, effect, EventEmitter, Input, Output, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
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
  public pageText = signal<number>(1);
  public firstChangePage: boolean = false;
  constructor(private router: Router) {
    effect(() => {
      console.log('effect table', this.pageText());
      if (this.firstChangePage) this.actionChangePage.emit(this.pageText());
    });
  }

  public userDetail(email: string): void {
    this.router.navigate([`users/detail/`, email]);
  }

  public openModalDelete(user: IUser, event: MouseEvent): void {
    event.stopPropagation();
    this.actionDeleteUser.emit(user);
  }

  public changePage(page: number): void {
    if (page < 1) {
      return;
    }
    if (page > this.totalPages()) page = this.totalPages();
    this.startChangePage(() => this.pageText.set(page));
    console.log(page, this.pageText());
  }

  public nextPage(): void {
    this.startChangePage(() => this.pageText.update((value) => value + 1));
  }

  public previousPage(): void {
    this.startChangePage(() => this.pageText.update((value) => value - 1));
  }

  private startChangePage(fn: () => void) {
    console.log('startChangePage()');
    this.firstChangePage = true;
    fn();
  }
}
