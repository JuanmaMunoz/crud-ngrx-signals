import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, effect, Input, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Color } from '../../models/enums';
import { IUser, IUserDeleteState, IUserDetail, IUserGetDetailState } from '../../models/interfaces';
import {
  deleteUser,
  deleteUserConfirm,
  setInitialStateGetUsers,
} from '../../store/actions/users.action';
import { BoxInfoComponent } from '../box-info/box-info.component';
import { ChartComponent } from '../chart/chart.component';
import { ImgComponent } from '../img/img.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { IBoxInfo } from './../../models/interfaces';

@Component({
  selector: 'app-info',
  imports: [ImgComponent, BoxInfoComponent, ChartComponent, ModalDeleteComponent],
  providers: [DatePipe, CurrencyPipe],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  @Input() userDetail = signal<IUserDetail | null>(null);
  public boxInfoPosition = signal<IBoxInfo>({ color: Color.PRIMARY, label: 'Position', value: '' });
  public boxInfoIncorporation = signal<IBoxInfo>({
    color: Color.SECONDARY,
    label: 'Incorporation',
    value: '',
  });
  public boxInfoSalary = signal<IBoxInfo>({ color: Color.SUCCESS, label: 'Salary', value: 0 });
  public openModal = signal<boolean>(false);
  public loadingDelete!: Signal<boolean>;
  public successDelete!: Signal<boolean>;
  public userDeleting!: Signal<IUser | null>;
  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private store: Store<{ userDelete: IUserDeleteState; userDetail: IUserGetDetailState }>,
  ) {
    this.userDeleting = toSignal(
      this.store.select((state) => state.userDelete.user),
      { initialValue: null },
    );

    this.successDelete = toSignal(
      this.store.select((state) => state.userDelete.success),
      { initialValue: false },
    );

    this.loadingDelete = toSignal(
      this.store.select((state) => state.userDelete.loading),
      { initialValue: false },
    );

    effect(() => {
      if (this.userDetail()) {
        this.loadBoxesInfo({
          position: this.userDetail()?.info.position!,
          incorporation: this.userDetail()?.info.date!,
          salary: this.userDetail()?.info.salary!,
        });
      }
    });

    effect(() => {
      if (this.successDelete()) {
        this.store.dispatch(setInitialStateGetUsers());
        this.router.navigate(['/users']);
      }
    });
  }

  private loadBoxesInfo(info: {
    position: string;
    incorporation: EpochTimeStamp;
    salary: number;
  }): void {
    this.boxInfoPosition.update((data) => ({
      ...data,
      value: info.position,
    }));
    this.boxInfoIncorporation.update((data) => ({
      ...data,
      value: this.datePipe.transform(info.incorporation!, 'MM/dd/yyyy')!,
    }));
    this.boxInfoSalary.update((data) => ({
      ...data,
      value: this.currencyPipe.transform(info.salary, 'USD', 'symbol', '1.0-0')!,
    }));
  }

  public openModalDelete(): void {
    this.openModal.set(true);
    const user: IUser = this.userDetail()?.info!;
    this.store.dispatch(deleteUser({ user }));
  }

  public actionModalDelete(deleteUser: boolean): void {
    deleteUser ? this.store.dispatch(deleteUserConfirm()) : this.openModal.set(false);
  }
}
