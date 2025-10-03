import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { ITokenState } from '../../common/models/interfaces';
import { SessionService } from '../../common/services/session.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private sessionService = inject(SessionService);
  public startLogin(email: string, pass: string): Observable<ITokenState> {
    if (email === 'user@test' && pass === 'ajk38jkÑ') {
      return of(this.sessionService.createFakeToken(email)).pipe(delay(500));
    } else {
      return throwError(
        () =>
          ({
            error: { code: '401', error: 'The credentials are incorrect' },
          }) as HttpErrorResponse,
      ).pipe(delay(500));
    }
  }
}
