import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { IAuthState } from '../../../common/models/interfaces';
import { login } from '../../../common/store/actions/auth.action';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;
  let routerSpy: jasmine.SpyObj<Router>;

  const initialLoginState: IAuthState = {
    loading: false,
    error: null,
    success: false,
  };
  const initialState = {
    login: { ...initialLoginState },
    logout: { ...initialLoginState },
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [LoginComponent, BrowserAnimationsModule, NgxMaskDirective],
      providers: [
        provideMockStore({ initialState }),
        provideNgxMask(),
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LoginComponent);
    dispatchSpy = spyOn(store, 'dispatch');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login', () => {
    const credetials = { email: 'test@es.es', pass: '123456' };
    component.login(credetials);
    expect(dispatchSpy).toHaveBeenCalledWith(login(credetials));
  });

  it('should call router.navigate when login is success', () => {
    store.setState({
      login: {
        loading: false,
        error: null,
        success: true,
      },
      logout: { ...initialLoginState },
    });
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should exist info-crud, login-form and about-me components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const infoCrud = compiled.querySelector('app-info-crud');
    const loginForm = compiled.querySelector('app-login-form');
    const aboutMe = compiled.querySelector('app-about-me');
    expect(infoCrud).toBeTruthy();
    expect(loginForm).toBeTruthy();
    expect(aboutMe).toBeTruthy();
  });
});
