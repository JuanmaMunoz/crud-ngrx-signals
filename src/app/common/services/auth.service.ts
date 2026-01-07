import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { IToken } from '../models/interfaces';
import { loginError$, unknownError$ } from '../utils/errors';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private delay = 200;
  private sessionService = inject(SessionService);

  /*############ REAL API CALLS - TO BE USED IN PRODUCTION ############
  #####################################################################
  public login(email: string, pass: string): Observable<ITokenState> {
    return this.http.post<ITokenState>(`${your api url}/login`, { email, pass });
  }
  public logout(): Observable<void> {
    return this.http.delete<void>(`${your api url}/logout`, {});
  }
  #####################################################################
  #####################################################################*/

  //########### MOCK API CALLS - TO BE USED ON GITHUB PAGES ###########//
  //###################################################################
  public login(email: string, pass: string): Observable<IToken> {
    try {
      //throw new Error('Force unknown error');
      if (email === 'user@test' && pass === 'ajk38jkÑ') {
        return of(this.sessionService.createFakeToken(email)).pipe(delay(this.delay));
      } else {
        return loginError$;
      }
    } catch (error) {
      return unknownError$ || error;
    }
  }

  public logout(): Observable<void> {
    try {
      //throw new Error('Force unknown error');
      localStorage.removeItem('token');
      return of(undefined).pipe(delay(this.delay));
    } catch (error) {
      return unknownError$ || error;
    }
  }
  //###################################################################
  //###################################################################
}
