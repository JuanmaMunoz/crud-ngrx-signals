import { TestBed } from '@angular/core/testing';
import { IJWT, IToken } from '../../common/models/interfaces';
import { SessionService } from '../../common/services/session.service';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;

  beforeEach(() => {
    const mockSession = jasmine.createSpyObj('SessionService', ['createFakeToken']);

    TestBed.configureTestingModule({
      providers: [LoginService, { provide: SessionService, useValue: mockSession }],
    });

    service = TestBed.inject(LoginService);
    sessionServiceSpy = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;
  });

  it('should return token when login is correct', (done) => {
    const email = 'user@test';
    const fakePass = 'ajk38jkÑ';
    const jwt: IJWT = { expiration: 9999999999, email };
    const fakeToken: IToken = { jwt, token: 'xxx' };

    sessionServiceSpy.createFakeToken.and.returnValue(fakeToken);

    service.login(email, fakePass).subscribe((result) => {
      expect(result).toEqual(fakeToken);
      expect(sessionServiceSpy.createFakeToken).toHaveBeenCalledWith(email);
      done();
    });
  });

  it('should return error when login is incorrect', (done) => {
    service.login('wrong@test', 'badpass').subscribe({
      error: (err) => {
        expect(err).toEqual(err);
        done();
      },
    });
  });

  it('should return error when there is a exception in the login process', (done) => {
    sessionServiceSpy.createFakeToken.and.throwError('Error');

    service.login('user@test', 'ajk38jkÑ').subscribe({
      error: (err) => {
        expect(err).toEqual(err);
        done();
      },
    });
  });

  it('should remove item in localStorage when call logout', (done) => {
    spyOn(localStorage, 'removeItem');

    service.logout().subscribe((result) => {
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(result).toBeNull();
      done();
    });
  });

  it('should return error when there is a exception in the logout process', (done) => {
    spyOn(localStorage, 'removeItem').and.throwError('Error localStorage');

    service.logout().subscribe({
      error: (err) => {
        expect(err).toEqual(err);
        done();
      },
    });
  });
});

//TESTS REAL API

/* 
it('should login and return token state', () => {
  const email = 'user@test';
  const pass = 'ajk38jkÑ';
  

  const mockToken: IJWT = {
    email: 'test@test',
    expiration: new Date().getTime() + 3600000,
  };
  
  const tokenState: ITokenState = {
    jwt: mockToken,
    error: null,
    token: btoa(JSON.stringify(mockToken)),
  };

  service.login(email, pass).subscribe((response) => {
    expect(response).toEqual(tokenState);
  });

  const req = httpMock.expectOne(`${API_URL}/login`);

  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual({ email, pass });

  req.flush(tokenState);
});

it('should handle login error', () => {
  const email = 'test@test.com';
  const pass = 'wrong-pass';

  service.login(email, pass).subscribe({
    next: () => fail('should have failed'),
    error: (error) => {
      expect(error.status).toBe(401);
    },
  });

  const req = httpMock.expectOne(`${API_URL}/login`);
  req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
});*/
