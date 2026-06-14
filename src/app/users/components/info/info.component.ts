import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { Color } from '../../models/enums';
import { IAvatar, IUserDetail } from '../../models/interfaces';
import { AvatarComponent } from '../avatar/avatar.component';
import { BoxInfoComponent } from '../box-info/box-info.component';
import { ChartComponent } from '../chart/chart.component';
import { SpinnerComponent } from './../../../common/components/spinner/spinner.component';
import { IBoxInfo } from './../../models/interfaces';

@Component({
  selector: 'app-info',
  imports: [BoxInfoComponent, ChartComponent, AvatarComponent, SpinnerComponent],
  providers: [DatePipe, CurrencyPipe],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  userDetail = input.required<IUserDetail | null>();
  actionOpenModal = output<void>();
  actionEdit = output<void>();
  public boxInfoPosition = signal<IBoxInfo>({
    color: Color.PRIMARY,
    label: 'Position',
    value: '',
  });
  public boxInfoIncorporation = signal<IBoxInfo>({
    color: Color.SECONDARY,
    label: 'Incorporation',
    value: '',
  });
  public boxInfoSalary = signal<IBoxInfo>({
    color: Color.SUCCESS,
    label: 'Salary',
    value: 0,
  });
  public infoAvatar!: IAvatar;
  private datePipe = inject(DatePipe);
  private currencyPipe = inject(CurrencyPipe);

  private readonly userDetaileffect = effect(() => {
    if (this.userDetail()) {
      this.setBoxesInfo({
        position: this.userDetail()!.info.position!,
        incorporation: this.userDetail()!.info.date!,
        salary: this.userDetail()!.info.salary!,
      });
      this.setInfoAvatar(this.userDetail()!);
    }
  });

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
      value: this.currencyPipe.transform(info.salary, 'USD', 'symbol', '1.0-2')!,
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
