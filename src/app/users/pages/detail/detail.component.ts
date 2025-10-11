import { Component, effect, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { InfoComponent } from '../../components/info/info.component';
import { IUserDetail, IUserGetDetailState } from '../../models/interfaces';
import { getUserDetail } from '../../store/actions/users.action';

@Component({
  selector: 'app-detail',
  imports: [InfoComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  public userDetail!: Signal<IUserDetail | null>;
  constructor(
    private store: Store<{ userDetail: IUserGetDetailState }>,
    private route: ActivatedRoute,
  ) {
    this.userDetail = toSignal(
      this.store.select((state) => state.userDetail.userDetail),
      { initialValue: null },
    );

    effect(() => {
      if (this.userDetail()) {
        console.log(this.userDetail());
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const email = params.get('id') as string;
      this.store.dispatch(getUserDetail({ email }));
    });
  }
}
