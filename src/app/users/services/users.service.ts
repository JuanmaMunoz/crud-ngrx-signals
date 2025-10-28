import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { statistics } from '../../../assets/data/statistics';
import { users } from '../../../assets/data/users';
import { SessionService } from '../../common/services/session.service';
import { emailInUseError, unknownError, userNotFoundError } from '../../common/utils/errors';
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

  /*############ REAL API CALLS - TO BE USED IN PRODUCTION ############
  #####################################################################
  public getUsers(params: IGetUsersParams): Observable<IReqGetUsers> {
    const { page, number, search } = params;
    const apiUrl = `${your api url}/users?page=${page}&number=${number}&search=${search}`;
    return this.http.get<IReqGetUsers>(apiUrl);
  }
  public deleteUser(user: IUser): Observable<null> {
    return this.http.delete<null>(`${your api url}/users/${user.email}`, {}); 
  }
  public getUserDetail(email: string): Observable<IUserDetail> {
    return this.http.get<IUserDetail>(`${your api url}/users/${email}`);
  }
  public editUser(oldEmail: string, userDetail: IUserDetail): Observable<null> {
    return this.http.put<null>(`${your api url}/users/${oldEmail}`, userDetail);
  }
  public createUser(userDetail: IUserDetail): Observable<null> {
    return this.http.post<null>(`${your api url}/users`, userDetail);
  }
  #####################################################################
  #####################################################################*/

  //########### MOCK API CALLS - TO BE USED ON GITHUB PAGES ###########//
  //###################################################################

  public getUsers(params: IGetUsersParams): Observable<IReqGetUsers> {
    try {
      //throw new Error('Force unknown error'); // Check error handling
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
      return unknownError;
    }
  }

  public deleteUser(user: IUser): Observable<null> {
    try {
      //throw new Error('Force unknown error'); // Check error handling
      this.allUsers = this.allUsers.filter((u: IUser) => u.email !== user.email);
      this.usersStatistics = this.usersStatistics.filter(
        (s: IUserStatistics) => s.email !== user.email,
      );
      return of(null).pipe(delay(this.delay));
    } catch (error) {
      return unknownError;
    }
  }

  public getUserDetail(email: string): Observable<IUserDetail> {
    try {
      //throw new Error('Force unknown error'); // Check error handling
      const info: IUser = this.allUsers.find((u: IUser) => u.email === email)!;
      const statistics: IUserStatistics = this.usersStatistics.find(
        (u: IUserStatistics) => u.email === email,
      )!;
      if (info && statistics) {
        return of({ info, statistics }).pipe(delay(this.delay));
      } else {
        return userNotFoundError;
      }
    } catch (error) {
      return unknownError;
    }
  }

  public editUser(oldEmail: string, userDetail: IUserDetail): Observable<null> {
    try {
      //throw new Error('Force unknown error'); // Check error handling
      if (oldEmail !== userDetail.info.email) {
        if (!this.checkExistEmail(userDetail.info.email)) {
          this.editArrayUser(oldEmail, userDetail);
          return of(null).pipe(delay(this.delay));
        } else {
          return emailInUseError;
        }
      } else {
        this.editArrayUser(oldEmail, userDetail);
        return of(null).pipe(delay(this.delay));
      }
    } catch (error) {
      return unknownError;
    }
  }

  public createUser(userDetail: IUserDetail): Observable<null> {
    try {
      //throw new Error('Force unknown error'); // Check error handling
      if (!this.checkExistEmail(userDetail.info.email)) {
        this.insertArrayUser(userDetail);
        return of(null).pipe(delay(this.delay));
      } else {
        return emailInUseError;
      }
    } catch (error) {
      return unknownError;
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
  /*#####################################################################
  #####################################################################*/
}
