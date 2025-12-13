import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { lastValueFrom, Observable } from 'rxjs';
import { ITokenState } from '../../models/interfaces';
import { authGuard } from './auth.guard';

const initialTokenState: ITokenState = {
  jwt: null,
  token: '',
  error: null,
};

const mockInitialState = {
  token: initialTokenState,
};

describe('authGuard', () => {
  let router: Router;
  let mockStore: MockStore<{ token: ITokenState }>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: mockInitialState }),
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    });
    router = TestBed.inject(Router);
    mockStore = TestBed.inject(MockStore);
  });

  it('should return true and not navigate if the token is not expired', async () => {
    const futureTime = new Date().getTime() + 3600000;
    const validState: ITokenState = {
      ...initialTokenState,
      jwt: { expiration: futureTime } as any,
    };

    mockStore.setState({ token: validState });

    const result$ = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    const isLoggedIn = await lastValueFrom(result$ as Observable<boolean>);

    expect(isLoggedIn).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should return false and navigate to /login if the token is expired', async () => {
    const pastTime = new Date().getTime() - 3600000;
    const expiredState: ITokenState = {
      ...initialTokenState,
      jwt: { expiration: pastTime } as any,
    };

    mockStore.setState({ token: expiredState });

    const result$ = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    const isLoggedIn = await lastValueFrom(result$ as Observable<boolean>);

    expect(isLoggedIn).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return false and navigate to /login if the token expiration is null', async () => {
    const nullState: ITokenState = {
      ...initialTokenState,
      jwt: null,
    };
    mockStore.setState({ token: nullState });

    const result$ = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    const isLoggedIn = await lastValueFrom(result$ as Observable<boolean>);

    expect(isLoggedIn).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
