import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { IMessageState, ITokenState } from './common/models/interfaces';
import { SessionService } from './common/services/session.service';
import { logout } from './common/store/actions/auth.action';
import { sessionExpiredError, unknownError } from './common/utils/errors';
import { IAuthState } from './login/models/interfaces';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dispatchSpy: jasmine.Spy;

  const initialLoginState: IAuthState = {
    loading: false,
    error: null,
    success: false,
  };

  const initialTokenState: ITokenState = {
    token: '',
    jwt: null,
    error: null,
  };

  const initialStateMessage: IMessageState = {
    message: null,
  };

  const initialState = {
    login: { ...initialLoginState },
    logout: { ...initialLoginState },
    token: { ...initialTokenState },
    message: { ...initialStateMessage },
  };

  beforeEach(async () => {
    sessionServiceSpy = jasmine.createSpyObj('SessionService', ['checkSessionFromStorage']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: SessionService, useValue: sessionServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call checkSessionFromStorage on initialization', () => {
    expect(sessionServiceSpy.checkSessionFromStorage).toHaveBeenCalled();
  });

  it('should show the error modal and dispatch logout when tokenError exists', () => {
    store.setState({
      ...initialState,
      token: {
        ...initialTokenState,
        error: { error: sessionExpiredError },
      },
    });

    fixture.detectChanges();

    expect(component.showErrorModal()).toBeTrue();
    expect(component.errorMessage()).toContain(sessionExpiredError.message);
    expect(dispatchSpy).toHaveBeenCalledWith(logout());
  });

  it('should show the app-error when logoutError exists', () => {
    store.setState({
      ...initialState,
      logout: {
        ...initialLoginState,
        error: { error: unknownError },
      },
      message: { message: 'errot test' },
    });

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const appError = compiled.querySelector('app-error');
    expect(appError).toBeTruthy();
    expect(dispatchSpy).not.toHaveBeenCalledWith(logout());
  });

  it('should navigate to /login when logoutSuccess is true', () => {
    store.setState({
      ...initialState,
      logout: {
        ...initialLoginState,
        success: true,
        error: null,
      },
    });

    fixture.detectChanges();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
