import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IJWT, ITokenState } from '../models/interfaces';
import { authInterceptor } from './authInterceptor';

const mockToken: IJWT = {
  email: 'test@test',
  expiration: new Date().getTime() + 3600000,
};

const initialTokenState: ITokenState = {
  jwt: mockToken,
  error: null,
  token: btoa(JSON.stringify(mockToken)),
};

const mockInitialState = {
  token: initialTokenState,
};

describe('authInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let mockStore: MockStore<{ token: ITokenState }>;

  const apiUrl = '/api/data';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        provideMockStore({ initialState: mockInitialState }),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    mockStore = TestBed.inject(MockStore);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add Authorization header if token exists in state', (done) => {
    const tokenState: ITokenState = {
      ...initialTokenState,
      jwt: mockToken,
    };

    mockStore.setState({ token: tokenState });

    httpClient.get(apiUrl).subscribe(() => {
      done();
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${tokenState.token}`);

    req.flush({});
  });

  it('should NOT add Authorization header if token is NULL in state', (done) => {
    const tokenState: ITokenState = {
      ...initialTokenState,
      jwt: null,
      token: '',
    };

    mockStore.setState({ token: tokenState });

    httpClient.get(apiUrl).subscribe(() => {
      done();
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.headers.has('Authorization')).toBeFalsy();

    req.flush({});
  });

  it('should handle API success without changing request', (done) => {
    const tokenState: ITokenState = {
      ...initialTokenState,
      jwt: mockToken,
    };

    mockStore.setState({ token: tokenState });
    const mockResponse = { data: 'ok' };

    httpClient.get(apiUrl).subscribe({
      next: (response) => {
        expect(response).toEqual(mockResponse);
        done();
      },
    });

    const req = httpTestingController.expectOne(apiUrl);
    req.flush(mockResponse);
  });

  it('should re-throw error for non-401 HTTP errors', (done) => {
    const tokenState: ITokenState = {
      ...initialTokenState,
      jwt: mockToken,
    };

    mockStore.setState({ token: tokenState });

    httpClient.get(apiUrl).subscribe({
      next: () => fail('should have failed with the error'),
      error: (err) => {
        expect(err.status).toBe(500);
        expect(err.statusText).toBe('Internal Server Error');
        done();
      },
    });

    const req = httpTestingController.expectOne(apiUrl);
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should re-throw error for 401 Unauthorized errors', (done) => {
    const tokenState: ITokenState = {
      ...initialTokenState,
      jwt: mockToken,
    };

    mockStore.setState({ token: tokenState });

    httpClient.get(apiUrl).subscribe({
      next: () => fail('should have failed with the error'),
      error: (err) => {
        expect(err.status).toBe(401);
        expect(err.statusText).toBe('Unauthorized');
        done();
      },
    });

    const req = httpTestingController.expectOne(apiUrl);
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });
});
