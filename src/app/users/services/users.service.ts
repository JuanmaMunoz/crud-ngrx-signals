import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { statistics } from '../../../assets/data/statistics';
import { users } from '../../../assets/data/users';
import { SessionService } from '../../common/services/session.service';
import { IGetUsers, IReqGetUsers, IUser, IUserDetail, IUserStatistics } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private sessionService = inject(SessionService);
  private http = inject(HttpClient);
  private allUsers: IUser[] = users;
  private usersStatistics: IUserStatistics[] = statistics;

  public getUsers(params: IGetUsers): Observable<IReqGetUsers> {
    return of(this.allUsers).pipe(
      map((users) =>
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(params.search.toLowerCase()) ||
            user.lastName.toLowerCase().includes(params.search.toLowerCase()) ||
            user.email.toLowerCase().includes(params.search.toLowerCase()) ||
            user.salary.toString().toLowerCase().includes(params.search.toLowerCase()) ||
            user.position.toLowerCase().includes(params.search.toLowerCase()),
        ),
      ),
      map((users) => ({
        users: users.slice(
          params.page * params.number,
          params.page * params.number + params.number,
        ),
        totalPages:
          users.length <= 0 ? 0 : users.length < 10 ? 1 : Math.floor(users.length / params.number),
      })),
      delay(200),
    );
  }

  public deleteUser(user: IUser): Observable<null> {
    this.allUsers = this.allUsers.filter((u: IUser) => u.email !== user.email);
    return of(null).pipe(delay(200));
  }

  public getUserDetail(email: string): Observable<IUserDetail> {
    const info: IUser = this.allUsers.find((u: IUser) => u.email === email)!;
    const statistics: IUserStatistics = this.usersStatistics.find(
      (u: IUserStatistics) => u.email === email,
    )!;
    return of({ info, statistics });
  }
}
