import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { signal, WritableSignal } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAuthState, ITokenState } from '../../models/interfaces';
import { logout } from '../../store/actions/auth.action';
import { LogoComponent } from '../logo/logo.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;
  const success: WritableSignal<boolean> = signal(false);
  const initialLoginState: IAuthState = {
    loading: false,
    error: null,
    success: false,
  };

  const initialLogoutState: IAuthState = {
    loading: false,
    error: null,
    success: false,
  };

  const initialTokenState: ITokenState = {
    token: '',
    jwt: null,
    error: null,
  };

  const initialState = {
    login: initialLoginState,
    logout: initialLogoutState,
    token: initialTokenState,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, NavbarComponent, LogoComponent, BrowserAnimationsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.loginSuccess = success;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch logout actions when logout is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.logout();
    expect(dispatchSpy).toHaveBeenCalledWith(logout());
  });

  it('should render NavbarComponent when loginSuccess is true', () => {
    success.set(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const navbar = compiled.querySelector('app-navbar');
    const logo = compiled.querySelector('app-logo');
    expect(navbar).toBeTruthy();
    expect(logo).toBeFalsy();
  });

  it('should render LogoComponent when loginSuccess is false', () => {
    success.set(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const navbar = compiled.querySelector('app-navbar');
    const logo = compiled.querySelector('app-logo');
    expect(logo).toBeTruthy();
    expect(navbar).toBeFalsy();
  });
});
