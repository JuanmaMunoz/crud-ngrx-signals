import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, mergeMap, Observable, of, throwError, timer } from 'rxjs';
import { ITokenState } from '../../common/models/interfaces';
import { SessionService } from '../../common/services/session.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private delay: number = 200;
  private sessionService = inject(SessionService);

  private unknownError = timer(this.delay).pipe(
    mergeMap(() =>
      throwError(
        () =>
          ({
            status: 500,
            error: {
              code: 'ERROR_UNKNOWN',
              message: 'There is an unknown error in the system.',
            },
          }) as HttpErrorResponse,
      ),
    ),
  );

  public login(email: string, pass: string): Observable<ITokenState> {
    try {
      if (email === 'user@test' && pass === 'ajk38jkÑ') {
        return of(this.sessionService.createFakeToken(email)).pipe(delay(this.delay));
      } else {
        return timer(this.delay).pipe(
          mergeMap(() =>
            throwError(
              () =>
                ({
                  status: 401,
                  error: {
                    code: 'UNAUTHORIZED',
                    message: 'The username or password you entered is incorrect. Please try again.',
                  },
                }) as HttpErrorResponse,
            ),
          ),
        );
      }
    } catch (error) {
      return this.unknownError;
    }
  }

  public logout(): Observable<null> {
    try {
      localStorage.removeItem('token');
      return of(null).pipe(delay(this.delay));
    } catch (error) {
      return this.unknownError;
    }
  }
}
