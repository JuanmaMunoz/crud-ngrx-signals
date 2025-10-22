import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, mergeMap, Observable, of, throwError, timer } from 'rxjs';
import { statistics } from '../../../assets/data/statistics';
import { users } from '../../../assets/data/users';
import { SessionService } from '../../common/services/session.service';
import {
  IGetUsersParams,
  IReqGetUsers,
  IUser,
  IUserDetail,
  IUserStatistics,
} from '../models/interfaces';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private sessionService = inject(SessionService);
  private http = inject(HttpClient);
  private delay: number = 200;
  private allUsers: IUser[] = users;
  private usersStatistics: IUserStatistics[] = statistics;
  private errorEmailInUse = timer(this.delay).pipe(
    mergeMap(() =>
      throwError(
        () =>
          ({
            status: 409,
            error: {
              code: 'USER_EMAIL_ALREADY_EXISTS',
              message: 'The email is already in use.',
            },
          }) as HttpErrorResponse,
      ),
    ),
  );
  private userNotFoundError = timer(this.delay).pipe(
    mergeMap(() =>
      throwError(
        () =>
          ({
            status: 404,
            error: {
              code: 'USER_NOT_FOUND',
              message: 'No user found with the provided email.',
            },
          }) as HttpErrorResponse,
      ),
    ),
  );

  private unknownError = timer(this.delay).pipe(
    mergeMap(() =>
      throwError(
        () =>
          ({
            status: 500,
            error: {
              code: 'ERROR_UNKNOWN',
              message: 'There is an unknown error in the system.',
            },
          }) as HttpErrorResponse,
      ),
    ),
  );

  public getUsers(params: IGetUsersParams): Observable<IReqGetUsers> {
    try {
      const search = this.normalizeText(params.search);
      return of(this.allUsers).pipe(
        map((users) =>
          users.filter((user) => {
            const name = this.normalizeText(user.name);
            const lastName = this.normalizeText(user.lastName);
            const email = this.normalizeText(user.email);
            const salary = this.normalizeText(user.salary.toString());
            const position = this.normalizeText(user.position);
            const fullName = `${name} ${lastName}`;
            const date = new Date(user.date).toLocaleDateString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });
            return (
              date.includes(search) ||
              fullName.includes(search) ||
              email.includes(search) ||
              salary.includes(search) ||
              position.includes(search)
            );
          }),
        ),
        map((users) => ({
          users: users.slice(
            (params.page - 1) * params.number,
            (params.page - 1) * params.number + params.number,
          ),
          totalPages:
            users.length <= 0 ? 0 : users.length < 10 ? 1 : Math.ceil(users.length / params.number),
        })),
        delay(200),
      );
    } catch (error) {
      return this.unknownError;
    }
  }

  public deleteUser(user: IUser): Observable<null> {
    try {
      this.allUsers = this.allUsers.filter((u: IUser) => u.email !== user.email);
      this.usersStatistics = this.usersStatistics.filter(
        (s: IUserStatistics) => s.email !== user.email,
      );
      return of(null).pipe(delay(this.delay));
    } catch (error) {
      return this.unknownError;
    }
  }

  public getUserDetail(email: string): Observable<IUserDetail> {
    try {
      const info: IUser = this.allUsers.find((u: IUser) => u.email === email)!;
      const statistics: IUserStatistics = this.usersStatistics.find(
        (u: IUserStatistics) => u.email === email,
      )!;
      if (info && statistics) {
        return of({ info, statistics }).pipe(delay(this.delay));
      } else {
        return this.userNotFoundError;
      }
    } catch (error) {
      return this.unknownError;
    }
  }

  public editUser(oldEmail: string, userDetail: IUserDetail): Observable<null> {
    try {
      //throw new Error('Fallo intencional para test de catch');
      if (oldEmail !== userDetail.info.email) {
        if (!this.checkExistEmail(userDetail.info.email)) {
          this.editArrayUser(oldEmail, userDetail);
          return of(null).pipe(delay(this.delay));
        } else {
          return this.errorEmailInUse;
        }
      } else {
        this.editArrayUser(oldEmail, userDetail);
        return of(null).pipe(delay(this.delay));
      }
    } catch (error) {
      return this.unknownError;
    }
  }

  public createUser(userDetail: IUserDetail): Observable<null> {
    try {
      //throw new Error('Fallo intencional para test de catch');

      if (!this.checkExistEmail(userDetail.info.email)) {
        this.insertArrayUser(userDetail);
        return of(null).pipe(delay(this.delay));
      } else {
        return this.errorEmailInUse;
      }
    } catch (error) {
      return this.unknownError;
    }
  }

  private editArrayUser(oldEmail: string, user: IUserDetail): void {
    this.allUsers = this.allUsers.map((u: IUser) => {
      return u.email === oldEmail ? (u = user.info) : u;
    });

    this.usersStatistics = this.usersStatistics.map((s: IUserStatistics) => {
      return s.email === oldEmail ? (s = user.statistics) : s;
    });
  }

  private insertArrayUser(user: IUserDetail): void {
    this.allUsers.unshift(user.info);
    this.usersStatistics.unshift(user.statistics);
  }

  private checkExistEmail(newEmail: string): boolean {
    return this.allUsers.some((u: IUser) => u.email === newEmail);
  }

  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
