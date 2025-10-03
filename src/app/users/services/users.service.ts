import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SessionService } from '../../common/services/session.service';
import { IGetUsers, IUser } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private sessionService = inject(SessionService);
  private http = inject(HttpClient);

  public getUsers(params: IGetUsers): Observable<IUser[]> {
    const url = 'assets/data/users.json';
    return this.http.get<IUser[]>(url).pipe(
      map((users) =>
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(params.search.toLowerCase()) ||
            user.lastName.toLowerCase().includes(params.search.toLowerCase()) ||
            user.salary
              .toString()
              .toLowerCase()
              .includes(params.search.toLowerCase()) ||
            user.position.toLowerCase().includes(params.search.toLowerCase()),
        ),
      ),
      map((users) =>
        users.slice(
          params.page * params.number,
          params.page * params.number + params.number,
        ),
      ),
    );
  }
}
