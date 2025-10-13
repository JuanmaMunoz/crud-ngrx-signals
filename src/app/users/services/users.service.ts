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
          const date = new Date(user.date).toLocaleDateString();
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
  }

  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
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
