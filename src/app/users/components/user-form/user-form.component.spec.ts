import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { signal } from '@angular/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { statistics } from '../../../../assets/data/statistics';
import { users } from '../../../../assets/data/users';
import { IUserDetail } from '../../models/interfaces';
import { UserFormComponent } from './user-form.component';

fdescribe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  const userDetail: IUserDetail = {
    info: users[0],
    statistics: statistics[0],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent, NgxMaskDirective, BrowserAnimationsModule],
      providers: [provideNgxMask()],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    component.userDetail = signal(userDetail);
    component.loading = signal(false);
    component.error = signal(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call actionSame emit when call saveUser', () => {
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
});
