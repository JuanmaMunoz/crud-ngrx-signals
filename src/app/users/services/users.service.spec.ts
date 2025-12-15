import { TestBed } from '@angular/core/testing';
import { statistics } from '../../../assets/data/statistics';
import { users } from '../../../assets/data/users';
import { SessionService } from '../../common/services/session.service';
import { IGetUsersParams } from '../models/interfaces';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;

  beforeEach(() => {
    const mockSession = jasmine.createSpyObj('SessionService', ['checkSession']);
    TestBed.configureTestingModule({
      providers: [UsersService, { provide: SessionService, useValue: mockSession }],
    });

    service = TestBed.inject(UsersService);
    sessionServiceSpy = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a paged list of users when session is valid and no search is provided', (done) => {
    const number = 10;
    const totalPages = Math.ceil(users.length / number);
    const defaultParams: IGetUsersParams = { page: 1, number, search: '' };
    sessionServiceSpy.checkSession.and.returnValue(true);

    service.getUsers(defaultParams).subscribe((result) => {
      expect(sessionServiceSpy.checkSession).toHaveBeenCalled();
      expect(result.users.length).toEqual(number);
      expect(result.totalPages).toBe(totalPages);
      done();
    });
  });

  it('should return a paged list of users when session is valid and search is provided', (done) => {
    const number = 10;
    const defaultParams: IGetUsersParams = { page: 1, number, search: users[0].email };
    sessionServiceSpy.checkSession.and.returnValue(true);

    service.getUsers(defaultParams).subscribe((result) => {
      expect(sessionServiceSpy.checkSession).toHaveBeenCalled();
      expect(result.users.length).toEqual(1);
      expect(result.totalPages).toBe(1);
      done();
    });
  });

  it('should return a empty list of users', (done) => {
    const number = 10;
    const defaultParams: IGetUsersParams = { page: 1, number, search: 'notfound@test' };
    sessionServiceSpy.checkSession.and.returnValue(true);

    service.getUsers(defaultParams).subscribe((result) => {
      expect(sessionServiceSpy.checkSession).toHaveBeenCalled();
      expect(result.users.length).toEqual(0);
      expect(result.totalPages).toBe(0);
      done();
    });
  });

  it('should return error when there is a exception in the getUsers process', (done) => {
    const defaultParams: IGetUsersParams = { page: 1, number: 10, search: '' };
    sessionServiceSpy.checkSession.and.returnValue(false);
    service.getUsers(defaultParams).subscribe({
      error: (err) => {
        expect(err).toEqual(err);
        done();
      },
    });
  });

  it('should delete a user when session is valid', (done) => {
    const userToDelete = users[0];
    sessionServiceSpy.checkSession.and.returnValue(true);
    service.deleteUser(userToDelete).subscribe((result) => {
      expect(sessionServiceSpy.checkSession).toHaveBeenCalled();
      expect(result).toBeNull();
      expect(service['allUsers'].find((u) => u.email === userToDelete.email)).toBeUndefined();
      done();
    });
  });

  it('should return error when there is a exception in the deleteUser process', (done) => {
    const userToDelete = users[0];
    sessionServiceSpy.checkSession.and.returnValue(false);
    service.deleteUser(userToDelete).subscribe({
      error: (err) => {
        expect(err).toEqual(err);
        done();
      },
    });
  });

  it('should return user detail when session is valid and user exists', (done) => {
    const userEmail = users[1].email;
    sessionServiceSpy.checkSession.and.returnValue(true);

    service.getUserDetail(userEmail).subscribe((result) => {
      expect(sessionServiceSpy.checkSession).toHaveBeenCalled();
      expect(result.info.email).toBe(userEmail);
      expect(result.statistics.email).toBe(userEmail);
      done();
    });
  });

  it('should return error when user is not found', (done) => {
    const userEmail = 'notfound@test';
    sessionServiceSpy.checkSession.and.returnValue(true);

    service.getUserDetail(userEmail).subscribe({
      error: (err) => {
        expect(err).toEqual(err);
        done();
      },
    });
  });

  it('should return error when there is a exception in the getUserDetail process', (done) => {
    const userEmail = users[0].email;
    sessionServiceSpy.checkSession.and.returnValue(false);
    service.getUserDetail(userEmail).subscribe({
      error: (err) => {
        expect(err).toEqual(err);
        done();
      },
    });
  });

  it('should edit a user when session is valid', (done) => {
    const oldEmail = users[0].email;
    const newUserDetail = {
      info: { ...users[0], name: 'Updated Name' },
      statistics: statistics[0],
    };
    sessionServiceSpy.checkSession.and.returnValue(true);
    service.editUser(oldEmail, newUserDetail).subscribe((result) => {
      expect(sessionServiceSpy.checkSession).toHaveBeenCalled();
      expect(result).toBeNull();
      const updatedUser = service['allUsers'].find((u) => u.email === oldEmail);
      expect(updatedUser?.name).toBe('Updated Name');
      done();
    });
  });

  it('should edit a user´s email when session is valid', (done) => {
    const oldEmail = users[0].email;
    const newEmail = 'updated@email';
    const newUserDetail = {
      info: { ...users[0], email: newEmail },
      statistics: statistics[0],
    };
    sessionServiceSpy.checkSession.and.returnValue(true);
    service.editUser(oldEmail, newUserDetail).subscribe((result) => {
      expect(sessionServiceSpy.checkSession).toHaveBeenCalled();
      expect(result).toBeNull();
      const updatedUser = service['allUsers'].find((u) => u.email === newEmail);
      expect(updatedUser?.email).toBe(newEmail);
      done();
    });
  });

  it('should return error when the email exist in other user', (done) => {
    const oldEmail = users[0].email;
    const newUserDetail = {
      info: { ...users[0], email: users[1].email },
      statistics: statistics[0],
    };
    sessionServiceSpy.checkSession.and.returnValue(true);
    service.editUser(oldEmail, newUserDetail).subscribe({
      error: (err) => {
        expect(err).toEqual(err);
        done();
      },
    });
  });

  it('should return error when there is a exception in the editUser process', (done) => {
    const oldEmail = users[0].email;
    const newUserDetail = {
      info: { ...users[0], name: 'Updated Name' },
      statistics: statistics[0],
    };
    sessionServiceSpy.checkSession.and.returnValue(false);
    service.editUser(oldEmail, newUserDetail).subscribe({
      error: (err) => {
        expect(err).toEqual(err);
        done();
      },
    });
  });

  it('should create a user when session is valid', (done) => {
    const newEmail = 'newuser@email';
    const newUserDetail = {
      info: { ...users[0], email: newEmail },
      statistics: statistics[0],
    };
    sessionServiceSpy.checkSession.and.returnValue(true);
    service.createUser(newUserDetail).subscribe((result) => {
      expect(sessionServiceSpy.checkSession).toHaveBeenCalled();
      expect(result).toBeNull();
      const insertUser = service['allUsers'].find((u) => u.email === newEmail);
      expect(insertUser?.email).toBe(newEmail);
      done();
    });
  });

  it('should return error when there is a exception in the creation process', (done) => {
    const newEmail = 'newuser@email';
    const newUserDetail = {
      info: { ...users[0], email: newEmail },
      statistics: statistics[0],
    };
    sessionServiceSpy.checkSession.and.returnValue(false);
    service.createUser(newUserDetail).subscribe({
      error: (err) => {
        expect(err).toEqual(err);
        done();
      },
    });
  });

  it('should return error when the email exist in other user (creation)', (done) => {
    const newUserDetail = {
      info: { ...users[0], email: users[1].email },
      statistics: statistics[0],
    };
    sessionServiceSpy.checkSession.and.returnValue(true);
    service.createUser(newUserDetail).subscribe({
      error: (err) => {
        expect(err).toEqual(err);
        done();
      },
    });
  });
});
