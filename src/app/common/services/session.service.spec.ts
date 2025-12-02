import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../../login/store/actions/auth.action';
import { IJWT } from '../models/interfaces';
import { tokenCreate, tokenError } from '../store/actions/token.action';
import { sessionExpiredError } from '../utils/errors';
import { SessionService } from './session.service';

fdescribe('SessionService', () => {
  let service: SessionService;
  let storeSpy: jasmine.SpyObj<Store>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      providers: [SessionService, { provide: Store, useValue: spy }],
    });

    service = TestBed.inject(SessionService);
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create fake token and store it in localStorage', () => {
    const email = 'test@example.com';
    const result = service.createFakeToken(email);

    expect(result.jwt.email).toBe(email);
    expect(result.jwt.expiration).toBeGreaterThan(new Date().getTime());
    const stored = localStorage.getItem('token');
    expect(stored).toBeTruthy();
    expect(atob(stored!)).toContain(email);
  });

  it('should dispatch tokenCreate and loginSuccess if token in storage is valid', () => {
    const jwt: IJWT = {
      email: 'user@example.com',
      expiration: new Date().getTime() + 10000,
    };
    const token = btoa(JSON.stringify(jwt));
    localStorage.setItem('token', token);

    service.checkSessionFromStorage();

    expect(storeSpy.dispatch).toHaveBeenCalledWith(tokenCreate({ token, jwt }));
    expect(storeSpy.dispatch).toHaveBeenCalledWith(loginSuccess());
  });

  it('should remove token from storage if no token exists', () => {
    localStorage.removeItem('token');
    service.checkSessionFromStorage();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should return true if session not expired', () => {
    const jwt: IJWT = {
      email: 'user@example.com',
      expiration: new Date().getTime() + 10000,
    };
    (service as any).jwt = jwt;

    const result = service.checkSession();
    expect(result).toBeTrue();
    expect(storeSpy.dispatch).not.toHaveBeenCalledWith(tokenError({ error: sessionExpiredError }));
  });

  it('should dispatch tokenError and return false if session expired', () => {
    const jwt: IJWT = {
      email: 'expired@example.com',
      expiration: new Date().getTime() - 10000,
    };
    (service as any).jwt = jwt;

    const result = service.checkSession();
    expect(result).toBeFalse();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(tokenError({ error: sessionExpiredError }));
  });
});
