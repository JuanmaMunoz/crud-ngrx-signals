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
  public startLogin(email: string, pass: string): Observable<ITokenState> {
    if (email === 'user@test' && pass === 'ajk38jkÑ') {
      return of(this.sessionService.createFakeToken(email)).pipe(delay(this.delay));
    } else {
      return timer(this.delay).pipe(
        mergeMap(() =>
          throwError(
            () =>
              ({
                status: 401,
                statusText: 'Unauthorized',
                error: {
                  code: '401',
                  message: 'The username or password you entered is incorrect. Please try again.',
                },
              }) as HttpErrorResponse,
          ),
        ),
      );
    }
  }
}
