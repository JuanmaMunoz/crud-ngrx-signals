import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { lastValueFrom, Observable } from 'rxjs';
import { IJWT, ITokenState } from '../../../common/models/interfaces';
import { loginGuard } from './login.guard';

const jwt: IJWT = { expiration: 9999999999, email: 'user@test' };

const initialTokenState: ITokenState = {
  jwt: jwt,
  token: btoa(JSON.stringify(jwt)),
  error: null,
};

const mockInitialState = {
  token: initialTokenState,
};

describe('loginGuard', () => {
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

  it('should return true and navigate if the token is expired', async () => {
    const futureTime = new Date().getTime() - 3600000;
    const token: ITokenState = {
      ...initialTokenState,
      jwt: { expiration: futureTime } as IJWT,
    };

    mockStore.setState({ token });

    const result$ = TestBed.runInInjectionContext(() =>
      loginGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );
    const isLoggedIn = await lastValueFrom(result$ as Observable<boolean>);

    expect(isLoggedIn).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should return false and navigate to /users if the token is not expired', async () => {
    const pastTime = new Date().getTime() + 3600000;
    const token: ITokenState = {
      ...initialTokenState,
      jwt: { expiration: pastTime } as IJWT,
    };

    mockStore.setState({ token });

    const result$ = TestBed.runInInjectionContext(() =>
      loginGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );
    const isLoggedIn = await lastValueFrom(result$ as Observable<boolean>);

    expect(isLoggedIn).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });
});
