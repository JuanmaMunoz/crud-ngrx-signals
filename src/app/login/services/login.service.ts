import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { IToken } from '../../common/models/interfaces';
import { SessionService } from '../../common/services/session.service';
import { loginError$, unknownError$ } from '../../common/utils/errors';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private delay: number = 200;
  private sessionService = inject(SessionService);

  /*############ REAL API CALLS - TO BE USED IN PRODUCTION ############
  #####################################################################
  public login(email: string, pass: string): Observable<ITokenState> {
    return this.http.post<ITokenState>(`${your api url}/login`, { email, password: pass });
  }
  public logout(): Observable<null> {
    return this.http.delete<null>(`${your api url}/logout`, {});
  }
  #####################################################################
  #####################################################################*/

  //########### MOCK API CALLS - TO BE USED ON GITHUB PAGES ###########//
  //###################################################################
  public login(email: string, pass: string): Observable<IToken> {
    try {
      //throw new Error('Force unknown error'); // Check error handling
      if (email === 'user@test' && pass === 'ajk38jkÑ') {
        return of(this.sessionService.createFakeToken(email)).pipe(delay(this.delay));
      } else {
        return loginError$;
      }
    } catch (error) {
      return unknownError$;
    }
  }

  public logout(): Observable<null> {
    try {
      //throw new Error('Force unknown error'); // Check error handling
      localStorage.removeItem('token');
      return of(null).pipe(delay(this.delay));
    } catch (error) {
      return unknownError$;
    }
  }
  //###################################################################
  //###################################################################
}
