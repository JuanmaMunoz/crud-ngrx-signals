import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError, toArray } from 'rxjs';

import { IJWT, IToken } from '../../../common/models/interfaces';
import { tokenCreate } from '../../../common/store/actions/token.action';
import { LoginService } from '../../services/login.service';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
} from '../actions/auth.action';
import { loginEffect, logoutEffect } from './auth.effect';

describe('AuthEffects', () => {
  let actions$: Observable<Action>;
  let loginService: jasmine.SpyObj<LoginService>;
  const jwt: IJWT = { expiration: 9999999999, email: 'test@test' };
  const mockToken: IToken = {
    token: 'mock_access_token',
    jwt,
  };

  const mockError: HttpErrorResponse = new HttpErrorResponse({
    status: 401,
    statusText: 'Unauthorized',
  });

  beforeEach(() => {
    loginService = jasmine.createSpyObj('LoginService', ['login', 'logout']);

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: LoginService, useValue: loginService },
      ],
    });
  });

  describe('loginEffect', () => {
    it('should dispatch loginSuccess and tokenCreate actions on successful login', (done) => {
      actions$ = of(login({ email: 'test@example.com', pass: 'password' }));
      loginService.login.and.returnValue(of(mockToken));

      TestBed.runInInjectionContext(() => {
        loginEffect()
          .pipe(toArray())
          .subscribe((actions) => {
            expect(actions).toEqual([
              loginSuccess(),
              tokenCreate({ token: mockToken.token, jwt: mockToken.jwt }),
            ]);
            done();
          });
      });
    });

    it('should dispatch loginFailure action on login error', (done) => {
      actions$ = of(login({ email: 'test@example.com', pass: 'wrong' }));
      loginService.login.and.returnValue(throwError(() => mockError));

      TestBed.runInInjectionContext(() => {
        loginEffect().subscribe((action) => {
          expect(action).toEqual(loginFailure({ error: mockError }));
          done();
        });
      });
    });
  });

  describe('logoutEffect', () => {
    it('should dispatch logoutSuccess action on successful logout', (done) => {
      actions$ = of(logout());
      loginService.logout.and.returnValue(of(null));

      TestBed.runInInjectionContext(() => {
        logoutEffect().subscribe((action) => {
          expect(action).toEqual(logoutSuccess());
          done();
        });
      });
    });

    it('should dispatch logoutFailure action on logout error', (done) => {
      actions$ = of(logout());
      loginService.logout.and.returnValue(throwError(() => mockError));

      TestBed.runInInjectionContext(() => {
        logoutEffect().subscribe((action) => {
          expect(action).toEqual(logoutFailure({ error: mockError }));
          done();
        });
      });
    });
  });
});
