import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ITokenState } from '../../common/models/interfaces';
import { SessionService } from '../../common/services/session.service';
import { loginError, unknownError } from '../../common/utils/errors';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private delay: number = 200;
  private sessionService = inject(SessionService);

  public login(email: string, pass: string): Observable<ITokenState> {
    try {
      //throw new Error('Force unknown error'); // Check error handling
      if (email === 'user@test' && pass === 'ajk38jkÑ') {
        return of(this.sessionService.createFakeToken(email)).pipe(delay(this.delay));
      } else {
        return loginError;
      }
    } catch (error) {
      return unknownError;
    }
  }

  public logout(): Observable<null> {
    try {
      //throw new Error('Force unknown error'); // Check error handling
      localStorage.removeItem('token');
      return of(null).pipe(delay(this.delay));
    } catch (error) {
      return unknownError;
    }
  }
}
