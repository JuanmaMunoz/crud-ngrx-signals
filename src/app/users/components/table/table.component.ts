import { DatePipe } from '@angular/common';
import { Component, effect, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { IGetUsers, IUsersState } from '../../models/interfaces';
import { getUsers } from '../../store/actions/users.action';
import { IUser } from './../../models/interfaces';

@Component({
  selector: 'app-table',
  imports: [DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  public users!: Signal<IUser[]>;
  constructor(private store: Store<{ users: IUsersState }>) {
    this.users = toSignal(
      this.store.select((state) => state.users.users),
      { initialValue: [] },
    );

    effect(() => {
      if (this.users().length) {
        console.log('-->', this.users());
      }
    });
  }

  ngOnInit(): void {
    const data: IGetUsers = {
      page: 1,
      number: 10,
      search: '',
    };
    this.store.dispatch(getUsers(data));
  }
}
