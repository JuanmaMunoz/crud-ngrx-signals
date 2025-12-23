import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpErrorResponse } from '@angular/common/http';
import { signal, WritableSignal } from '@angular/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { statistics } from '../../../../assets/data/statistics';
import { users } from '../../../../assets/data/users';
import { emailInUseError } from '../../../common/utils/errors';
import { IUserDetail } from '../../models/interfaces';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  const userDetail: WritableSignal<IUserDetail | null> = signal({
    info: users[0],
    statistics: statistics[0],
  });

  const error: WritableSignal<HttpErrorResponse | null> = signal(null);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent, NgxMaskDirective, BrowserAnimationsModule],
      providers: [provideNgxMask()],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    component.userDetail = userDetail;
    component.loading = signal(false);
    component.error = error;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call actionSame.emit when saveUser is called', () => {
    const userDetail: IUserDetail = {
      info: {
        name: component.nameControl.getRawValue(),
        lastName: component.lastNameControl.getRawValue(),
        position: component.positionControl.getRawValue(),
        date: new Date(component.dateControl.getRawValue()).getTime(),
        salary: component.salaryControl.getRawValue(),
        email: component.emailControl.getRawValue(),
      },
      statistics: {
        email: component.emailControl.getRawValue(),
        proactivity: component.proactivityControl.getRawValue(),
        productivity: component.productivityControl.getRawValue(),
        hardworking: component.hardworkingControl.getRawValue(),
        coworker: component.coworkerControl.getRawValue(),
        knowledge: component.knowledgeControl.getRawValue(),
      },
    };
    spyOn(component.actionSave, 'emit');
    component.saveUser();
    expect(component.actionSave.emit).toHaveBeenCalledWith(userDetail);
  });

  it('should call actionCancel.emit when cancel is called', () => {
    spyOn(component.actionCancel, 'emit');
    component.cancel();
    expect(component.actionCancel.emit).toHaveBeenCalled();
  });

  it('should enable save button when form is valid', () => {
    userDetail.set({
      info: users[0],
      statistics: statistics[0],
    });
    fixture.detectChanges();
    component.loadForm();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const saveButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(saveButton.disabled).toBeFalse();
  });

  it('should show error when user exists', () => {
    component.loadForm();
    fixture.detectChanges();
    error.set(emailInUseError);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const saveButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(saveButton.disabled).toBeTrue();
  });

  it('should disable save button when form is invalid', () => {
    userDetail.set(null);
    fixture.detectChanges();
    component.loadForm();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const saveButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(saveButton.disabled).toBeTrue();
  });

  it('should exist input, input-number and input-date components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const inputComponents = compiled.querySelectorAll('app-input-text');
    const inputNumberComponents = compiled.querySelectorAll('app-input-number');
    const inputDateComponents = compiled.querySelectorAll('app-input-date');
    expect(inputComponents.length).toBe(5);
    expect(inputNumberComponents.length).toBe(5);
    expect(inputDateComponents.length).toBe(1);
  });
});
