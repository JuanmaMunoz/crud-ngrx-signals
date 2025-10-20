import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, effect, EventEmitter, Input, Output, signal, Signal } from '@angular/core';
import { Color } from '../../models/enums';
import { IAvatar, IUserDetail } from '../../models/interfaces';
import { AvatarComponent } from '../avatar/avatar.component';
import { BoxInfoComponent } from '../box-info/box-info.component';
import { ChartComponent } from '../chart/chart.component';
import { IBoxInfo } from './../../models/interfaces';

@Component({
  selector: 'app-info',
  imports: [BoxInfoComponent, ChartComponent, AvatarComponent],
  providers: [DatePipe, CurrencyPipe],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  @Input() userDetail!: Signal<IUserDetail | null>;
  @Output() actionOpenModal: EventEmitter<null> = new EventEmitter();
  @Output() actionEdit: EventEmitter<null> = new EventEmitter();
  public boxInfoPosition = signal<IBoxInfo>({ color: Color.PRIMARY, label: 'Position', value: '' });
  public boxInfoIncorporation = signal<IBoxInfo>({
    color: Color.SECONDARY,
    label: 'Incorporation',
    value: '',
  });
  public boxInfoSalary = signal<IBoxInfo>({ color: Color.SUCCESS, label: 'Salary', value: 0 });
  public infoAvatar!: IAvatar;
  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
  ) {
    effect(() => {
      if (this.userDetail()) {
        this.setBoxesInfo({
          position: this.userDetail()?.info.position!,
          incorporation: this.userDetail()?.info.date!,
          salary: this.userDetail()?.info.salary!,
        });
        this.setInfoAvatar(this.userDetail()!);
      }
    });
  }

  private setBoxesInfo(info: {
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

  private setInfoAvatar(user: IUserDetail): void {
    this.infoAvatar = {
      title: `${user.info.name} ${user.info.lastName}`,
      description: `${user.info.email}`,
    };
  }

  public openModalDelete(): void {
    this.actionOpenModal.emit();
  }

  public edit(): void {
    this.actionEdit.emit();
  }
}
