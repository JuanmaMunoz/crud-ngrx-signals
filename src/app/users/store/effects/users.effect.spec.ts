import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError, toArray } from 'rxjs';

import {
  userCreateEffect,
  userDeleteEffect,
  userEditEffect,
  userGetDetailEffect,
  usersEffect,
} from './users.effect';

import { UsersService } from '../../services/users.service';
import {
  createUser,
  createUserFailure,
  createUserSuccess,
  deleteUserConfirm,
  deleteUserFailure,
  deleteUserSuccess,
  editUser,
  editUserFailure,
  editUserSuccess,
  getUserDetail,
  getUserDetailFailure,
  getUserDetailSuccess,
  getUsers,
  getUsersFailure,
  getUsersSuccess,
} from '../actions/users.action';

import { statistics } from '../../../../assets/data/statistics';
import { users } from '../../../../assets/data/users';
import { messageShow } from '../../../common/store/actions/message.action';
import { IGetUsersParams, IReqGetUsers, IUserDetail } from '../../models/interfaces';

describe('UsersEffects', () => {
  let actions$: Observable<Action>;
  let usersService: jasmine.SpyObj<UsersService>;

  const mockError = new HttpErrorResponse({
    error: {
      status: 500,
      statusText: 'Server Error',
    },
  });

  const mockUsersResponse: IReqGetUsers = {
    users: users,
    totalPages: 2,
  };

  const mockUserDetail: IUserDetail = {
    info: users[0],
    statistics: statistics[0],
  };

  beforeEach(() => {
    usersService = jasmine.createSpyObj('UsersService', [
      'getUsers',
      'deleteUser',
      'getUserDetail',
      'editUser',
      'createUser',
    ]);

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            userDelete: {
              user: 'test@test.com',
            },
          },
        }),
        { provide: UsersService, useValue: usersService },
      ],
    });
  });

  it('should dispatch getUsersSuccess on success', (done) => {
    actions$ = of(getUsers({ page: 1 } as IGetUsersParams));
    usersService.getUsers.and.returnValue(of(mockUsersResponse));

    TestBed.runInInjectionContext(() => {
      usersEffect().subscribe((action) => {
        expect(action).toEqual(
          getUsersSuccess({
            users: mockUsersResponse.users,
            totalPages: mockUsersResponse.totalPages,
          }),
        );
        done();
      });
    });
  });

  it('should dispatch getUsersFailure on error', (done) => {
    actions$ = of(getUsers({ page: 1 } as IGetUsersParams));
    usersService.getUsers.and.returnValue(throwError(() => mockError));

    TestBed.runInInjectionContext(() => {
      usersEffect()
        .pipe(toArray())
        .subscribe((actions) => {
          expect(actions[0]).toEqual(getUsersFailure({ error: mockError }));
          expect(actions[1]).toEqual(messageShow({ message: mockError.error.message }));
          done();
        });
    });
  });

  it('should dispatch deleteUserSuccess on success', (done) => {
    actions$ = of(deleteUserConfirm());
    usersService.deleteUser.and.returnValue(of(undefined));

    TestBed.runInInjectionContext(() => {
      userDeleteEffect().subscribe((action) => {
        expect(action).toEqual(deleteUserSuccess());
        done();
      });
    });
  });

  it('should dispatch deleteUserFailure on error', (done) => {
    actions$ = of(deleteUserConfirm());
    usersService.deleteUser.and.returnValue(throwError(() => mockError));

    TestBed.runInInjectionContext(() => {
      userDeleteEffect()
        .pipe(toArray())
        .subscribe((actions) => {
          expect(actions[0]).toEqual(deleteUserFailure({ error: mockError }));
          expect(actions[1]).toEqual(messageShow({ message: mockError.error.message }));
          done();
        });
    });
  });

  it('should dispatch getUserDetailSuccess on success', (done) => {
    actions$ = of(getUserDetail({ email: 'test@test.com' }));
    usersService.getUserDetail.and.returnValue(of(mockUserDetail));

    TestBed.runInInjectionContext(() => {
      userGetDetailEffect().subscribe((action) => {
        expect(action).toEqual(getUserDetailSuccess({ userDetail: mockUserDetail }));
        done();
      });
    });
  });

  it('should dispatch getUserDetailFailure on error', (done) => {
    actions$ = of(getUserDetail({ email: 'test@test.com' }));
    usersService.getUserDetail.and.returnValue(throwError(() => mockError));

    TestBed.runInInjectionContext(() => {
      userGetDetailEffect()
        .pipe(toArray())
        .subscribe((actions) => {
          expect(actions[0]).toEqual(getUserDetailFailure({ error: mockError }));
          expect(actions[1]).toEqual(messageShow({ message: mockError.error.message }));
          done();
        });
    });
  });

  it('should dispatch editUserSuccess on success', (done) => {
    actions$ = of(editUser({ userDetail: mockUserDetail, oldEmail: 'old@test.com' }));
    usersService.editUser.and.returnValue(of(undefined));

    TestBed.runInInjectionContext(() => {
      userEditEffect().subscribe((action) => {
        expect(action).toEqual(editUserSuccess());
        done();
      });
    });
  });

  it('should dispatch editUserFailure on error', (done) => {
    actions$ = of(editUser({ userDetail: mockUserDetail, oldEmail: 'old@test.com' }));
    usersService.editUser.and.returnValue(throwError(() => mockError));

    TestBed.runInInjectionContext(() => {
      userEditEffect()
        .pipe(toArray())
        .subscribe((actions) => {
          expect(actions[0]).toEqual(editUserFailure({ error: mockError }));
          expect(actions[1]).toEqual(messageShow({ message: mockError.error.message }));
          done();
        });
    });
  });

  it('should dispatch createUserSuccess on success', (done) => {
    actions$ = of(createUser({ userDetail: mockUserDetail }));
    usersService.createUser.and.returnValue(of(undefined));

    TestBed.runInInjectionContext(() => {
      userCreateEffect().subscribe((action) => {
        expect(action).toEqual(createUserSuccess());
        done();
      });
    });
  });

  it('should dispatch createUserFailure on error', (done) => {
    actions$ = of(createUser({ userDetail: mockUserDetail }));
    usersService.createUser.and.returnValue(throwError(() => mockError));

    TestBed.runInInjectionContext(() => {
      userCreateEffect()
        .pipe(toArray())
        .forEach((actions) => {
          expect(actions[0]).toEqual(createUserFailure({ error: mockError }));
          expect(actions[1]).toEqual(messageShow({ message: mockError.error.message }));
          done();
        });
    });
  });
});
