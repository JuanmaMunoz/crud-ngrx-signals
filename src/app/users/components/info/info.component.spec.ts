import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CurrencyPipe, DatePipe } from '@angular/common';
import { signal } from '@angular/core';
import { statistics } from '../../../../assets/data/statistics';
import { users } from '../../../../assets/data/users';
import { IUserDetail } from '../../models/interfaces';
import { InfoComponent } from './info.component';

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
  let datePipe: DatePipe;
  let currencyPipe: CurrencyPipe;
  const userDetail: IUserDetail = {
    info: users[0],
    statistics: statistics[0],
  };

  beforeEach(async () => {
    datePipe = new DatePipe('en-US');
    currencyPipe = new CurrencyPipe('en-US');
    await TestBed.configureTestingModule({
      imports: [InfoComponent, BrowserAnimationsModule],
      providers: [
        { provide: DatePipe, useValue: datePipe },
        { provide: CurrencyPipe, useValue: currencyPipe },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    component.userDetail = signal<IUserDetail | null>(userDetail);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set box info values', () => {
    expect(component.boxInfoPosition().value).toBe(userDetail.info.position);
    const date = datePipe.transform(userDetail.info.date, 'MM/dd/yyyy');
    expect(component.boxInfoIncorporation().value).toBe(date!);
    const salary = currencyPipe.transform(userDetail.info.salary, 'USD', 'symbol', '1.0-0');
    expect(component.boxInfoSalary().value).toBe(salary!);
  });

  it('should set info avatar', () => {
    expect(component.infoAvatar.title).toBe(`${userDetail.info.name} ${userDetail.info.lastName}`);
    expect(component.infoAvatar.description).toBe(userDetail.info.email);
  });

  it('should emit actionOpenModal event', () => {
    spyOn(component.actionOpenModal, 'emit');
    component.openModalDelete();
    expect(component.actionOpenModal.emit).toHaveBeenCalled();
  });

  it('should emit actionEdit event', () => {
    spyOn(component.actionEdit, 'emit');
    component.edit();
    expect(component.actionEdit.emit).toHaveBeenCalled();
  });

  it('should exist avatar, box-info, chart components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const avatar = compiled.querySelector('app-avatar');
    const boxInfo = compiled.querySelectorAll('app-box-info');
    const chart = compiled.querySelector('app-chart');
    expect(avatar).toBeTruthy();
    expect(boxInfo.length).toBe(3);
    expect(chart).toBeTruthy();
  });

  it('should exist edit and delete buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    const buttonEdit = buttons[0];
    const buttonDelete = buttons[1];
    expect(buttonEdit).toBeTruthy();
    expect(buttonEdit.textContent).toContain('Edit');
    expect(buttonDelete).toBeTruthy();
    expect(buttonDelete.textContent).toContain('Delete');
  });
});
