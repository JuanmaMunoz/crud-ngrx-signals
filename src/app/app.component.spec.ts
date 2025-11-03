import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { ITokenState } from './common/models/interfaces';
import { SessionService } from './common/services/session.service';
import { ILoginState } from './login/models/interfaces';
import { logout } from './login/store/actions/login.action';

fdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dispatchSpy: jasmine.Spy;

  // initial state matching your interfaces
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
    logout: { ...initialLoginState }, // you said logout uses same ILoginState
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
    // run initial change detection (constructor already executed at createComponent)
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call checkSessionFromStorage on initialization', () => {
    expect(sessionServiceSpy.checkSessionFromStorage).toHaveBeenCalled();
  });

  it('should show the error modal and dispatch logout when tokenError exists', () => {
    // Token error used in your component: this.tokenError()?.message
    const tokenError = new HttpErrorResponse({
      error: 'Invalid token', // message is read via .message in your effect with tokenError()?.message
      status: 401,
      statusText: 'Unauthorized',
    });

    // set the state with token.error
    store.setState({
      ...initialState,
      token: {
        ...initialTokenState,
        error: tokenError,
      },
    });

    // trigger change detection so effects re-run
    fixture.detectChanges();

    expect(component.showErrorModal()).toBeTrue();
    // your effect sets errorMessage to tokenError()?.message
    console.log('tokenError.message-->', tokenError.message);
    console.log('component.errorMessage()-->', component.errorMessage());
    expect(component.errorMessage()).toContain(tokenError.message);
    // expect dispatch(logout()) to have been called
    expect(dispatchSpy).toHaveBeenCalledWith(logout());
  });

  it('should show the error modal when logoutError exists', () => {
    // In component you access logout.error.error.message
    const logoutErrorPayload = { message: 'Logout error' };
    const logoutError = new HttpErrorResponse({
      error: logoutErrorPayload,
      status: 500,
      statusText: 'Server Error',
    });

    store.setState({
      ...initialState,
      logout: {
        ...initialLoginState,
        error: logoutError,
      },
    });

    fixture.detectChanges();

    expect(component.showErrorModal()).toBeTrue();
    // component sets errorMessage to logoutError()?.error.message
    expect(component.errorMessage()).toBe(logoutErrorPayload.message);
    // dispatch should NOT be called (only token error triggers logout dispatch)
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
