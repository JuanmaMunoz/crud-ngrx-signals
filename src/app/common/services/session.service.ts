import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../../login/store/actions/login.action';
import { IToken, ITokenState } from '../models/interfaces';
import { createToken } from '../store/actions/token.action';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private store: Store<{ token: ITokenState }>) {}
  private tokenDuration: number = 60000;

  public checkSessionFromStorage(): void {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token') as string;
      const jwt: IToken = JSON.parse(atob(token));
      if (jwt!.expiration >= new Date().getTime()) {
        this.store.dispatch(createToken({ token: token, jwt: jwt }));
        this.store.dispatch(loginSuccess());
      }
    } else {
      localStorage.removeItem('token');
    }
  }

  public createFakeToken(email: string): ITokenState {
    const jwt: IToken = {
      email,
      expiration: new Date().getTime() + this.tokenDuration,
    };
    const token = btoa(JSON.stringify(jwt));
    localStorage.setItem('token', token);
    return { token: token, jwt: jwt };
  }
}
