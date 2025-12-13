import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideRouter, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { statistics } from '../../../../assets/data/statistics';
import { users } from '../../../../assets/data/users';
import { IUserCreateState, IUserDetail } from '../../models/interfaces';
import { createUser } from '../../store/actions/users.action';
import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let dispatchSpy: jasmine.Spy;
  let store: MockStore;
  let router: Router;
  const initialStateUserCreate: IUserCreateState = {
    loading: false,
    error: null,
    success: false,
    userDetail: null,
  };
  const initialState = {
    userCreate: { ...initialStateUserCreate },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateComponent, NgxMaskDirective, BrowserAnimationsModule],
      providers: [provideMockStore({ initialState }), provideRouter([]), provideNgxMask()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CreateComponent);
    dispatchSpy = spyOn(store, 'dispatch');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call router navigate when call cancelCreation', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.cancelCreation();
    expect(routerSpy).toHaveBeenCalledWith(['/users']);
  });

  it('should dispatch createUser when call saveCreation', () => {
    const userDetail: IUserDetail = {
      info: users[0],
      statistics: statistics[0],
    };
    component.saveCreation(userDetail);
    expect(dispatchSpy).toHaveBeenCalledWith(createUser({ userDetail }));
  });

  it('should call router navigate users/detail when userCreateSuccess is true', () => {
    const routerSpy = spyOn(router, 'navigate');
    store.setState({
      userCreate: {
        ...initialStateUserCreate,
        success: true,
        userDetail: {
          info: users[0],
          statistics: statistics[0],
        },
      },
    });
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalledWith(['/users/detail', users[0].email]);
  });

  it('should exist back-users and user-form components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-back-users')).toBeTruthy();
    expect(compiled.querySelector('app-user-form')).toBeTruthy();
  });
});
