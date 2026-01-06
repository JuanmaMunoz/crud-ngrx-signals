import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError, toArray } from 'rxjs';

import { IJWT, IToken } from '../../models/interfaces';
import { AuthService } from '../../services/auth.service';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
} from '../actions/auth.action';
import { messageShow } from '../actions/message.action';
import { tokenCreate } from '../actions/token.action';
import { loginEffect, logoutEffect } from './auth.effect';

describe('AuthEffects', () => {
  let actions$: Observable<Action>;
  let authService: jasmine.SpyObj<AuthService>;
  const jwt: IJWT = { expiration: 9999999999, email: 'test@test' };
  const mockToken: IToken = {
    token: 'mock_access_token',
    jwt,
  };

  const mockError: HttpErrorResponse = new HttpErrorResponse({
    error: {
      status: 401,
      statusText: 'Unauthorized',
    },
  });

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['login', 'logout']);

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: AuthService, useValue: authService },
      ],
    });
  });

  describe('loginEffect', () => {
    it('should dispatch loginSuccess and tokenCreate actions on successful login', (done) => {
      actions$ = of(login({ email: 'test@example.com', pass: 'password' }));
      authService.login.and.returnValue(of(mockToken));

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

    it('should dispatch all error actions', (done) => {
      actions$ = of(login({ email: 'test@example.com', pass: 'wrong' }));
      authService.login.and.returnValue(throwError(() => mockError));

      TestBed.runInInjectionContext(() => {
        loginEffect()
          .pipe(toArray())
          .subscribe((actions) => {
            expect(actions[0]).toEqual(loginFailure({ error: mockError }));
            expect(actions[1]).toEqual(messageShow({ message: mockError.error.message }));
            done();
          });
      });
    });
  });

  describe('logoutEffect', () => {
    it('should dispatch logoutSuccess action on successful logout', (done) => {
      actions$ = of(logout());
      authService.logout.and.returnValue(of(undefined));

      TestBed.runInInjectionContext(() => {
        logoutEffect().subscribe((action) => {
          expect(action).toEqual(logoutSuccess());
          done();
        });
      });
    });

    it('should dispatch logoutFailure action on logout error', (done) => {
      actions$ = of(logout());
      authService.logout.and.returnValue(throwError(() => mockError));

      TestBed.runInInjectionContext(() => {
        logoutEffect()
          .pipe(toArray())
          .subscribe((actions) => {
            expect(actions[0]).toEqual(logoutFailure({ error: mockError }));
            expect(actions[1]).toEqual(messageShow({ message: mockError.error.message }));
            done();
          });
      });
    });
  });
});
