import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../../login/store/actions/auth.action';
import { IJWT, IToken } from '../models/interfaces';
import { tokenCreate, tokenError } from '../store/actions/token.action';
import { sessionExpiredError } from '../utils/errors';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private store: Store) {}
  private tokenDuration: number = 3600000; //1 hour
  //private tokenDuration: number = 2000; //2 seconds for testing
  private jwt: IJWT | null = null;

  public checkSessionFromStorage(): void {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token') as string;
      this.jwt = JSON.parse(atob(token));
      if (this.jwt!.expiration >= new Date().getTime()) {
        this.store.dispatch(tokenCreate({ token: token, jwt: this.jwt }));
        this.store.dispatch(loginSuccess());
      }
    } else {
      localStorage.removeItem('token');
    }
  }

  public createFakeToken(email: string): IToken {
    this.jwt = {
      email,
      expiration: new Date().getTime() + this.tokenDuration,
    };
    const token = btoa(JSON.stringify(this.jwt));
    localStorage.setItem('token', token);
    return { token: token, jwt: this.jwt };
  }

  public checkSession(): boolean {
    if (this.jwt!.expiration < new Date().getTime()) {
      this.store.dispatch(tokenError({ error: sessionExpiredError }));
      return false;
    }
    return true;
  }
}
