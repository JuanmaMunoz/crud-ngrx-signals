import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ITokenState } from '../models/interfaces';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private sessionService: SessionService) {}

  public startLogin(email: string, pass: string): Observable<ITokenState> {
    if (email === 'user@test' && pass === '1234') {
      return of(this.sessionService.createFakeToken(email));
    } else {
      return throwError(
        () =>
          ({
            error: { code: '401', error: 'The credentials are incorrect' },
          }) as HttpErrorResponse,
      );
    }
  }
}
