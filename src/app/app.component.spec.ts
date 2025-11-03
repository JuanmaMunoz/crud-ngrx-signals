import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { ITokenState } from './common/models/interfaces';
import { SessionService } from './common/services/session.service';
import { sessionExpiredError, unknownError } from './common/utils/errors';
import { ILoginState } from './login/models/interfaces';
import { logout } from './login/store/actions/login.action';

fdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dispatchSpy: jasmine.Spy;

  const initialLoginState: ILoginState = {
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
    login: { ...initialLoginState },
    logout: { ...initialLoginState },
    token: { ...initialTokenState },
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

  it('should show the error modal when logoutError exists', () => {
    store.setState({
      ...initialState,
      logout: {
        ...initialLoginState,
        error: { error: unknownError },
      },
    });

    fixture.detectChanges();

    expect(component.showErrorModal()).toBeTrue();
    expect(component.errorMessage()).toBe(unknownError.message);
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
