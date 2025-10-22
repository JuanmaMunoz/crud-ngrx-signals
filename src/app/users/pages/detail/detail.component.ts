import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ErrorComponent } from '../../../common/components/error/error.component';
import { SpinnerComponent } from '../../../common/components/spinner/spinner.component';
import { BackUsersComponent } from '../../components/back-users/back-users.component';
import { InfoComponent } from '../../components/info/info.component';
import { ModalDeleteComponent } from '../../components/modal-delete/modal-delete.component';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import {
  IUser,
  IUserDeleteState,
  IUserDetail,
  IUserEditState,
  IUserGetDetailState,
} from '../../models/interfaces';
import {
  deleteUser,
  deleteUserConfirm,
  editUser,
  getUserDetail,
  setInitialStateUserDetail,
} from '../../store/actions/users.action';
import { setInitialStateDelete, setInitialStateEdit } from './../../store/actions/users.action';

@Component({
  selector: 'app-detail',
  imports: [
    InfoComponent,
    SpinnerComponent,
    ModalDeleteComponent,
    UserFormComponent,
    ErrorComponent,
    RouterModule,
    BackUsersComponent,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  public userDetail!: Signal<IUserDetail | null>;
  public userDetailError!: Signal<HttpErrorResponse | null>;
  public userDetailLoading!: Signal<boolean>;
  public deleteLoading!: Signal<boolean>;
  public deleteSuccess!: Signal<boolean>;
  public deleteUser!: Signal<IUser | null>;
  public openModal = signal<boolean>(false);
  public modeEdit = signal<boolean>(false);
  public editLoading!: Signal<boolean>;
  public editSuccess!: Signal<boolean>;
  public editError!: Signal<HttpErrorResponse | null>;
  public newEmail: string = '';

  constructor(
    private store: Store<{
      userDetail: IUserGetDetailState;
      userDelete: IUserDeleteState;
      userEdit: IUserEditState;
    }>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.userDetail = toSignal(
      this.store.select((state) => state.userDetail.userDetail),
      { initialValue: null },
    );

    this.userDetailLoading = toSignal(
      this.store.select((state) => state.userDetail.loading),
      { initialValue: false },
    );

    this.userDetailError = toSignal(
      this.store.select((state) => state.userDetail.error),
      { initialValue: null },
    );

    this.deleteUser = toSignal(
      this.store.select((state) => state.userDelete.user),
      { initialValue: null },
    );

    this.deleteSuccess = toSignal(
      this.store.select((state) => state.userDelete.success),
      { initialValue: false },
    );

    this.deleteLoading = toSignal(
      this.store.select((state) => state.userDelete.loading),
      { initialValue: false },
    );

    this.editSuccess = toSignal(
      this.store.select((state) => state.userEdit.success),
      { initialValue: false },
    );

    this.editLoading = toSignal(
      this.store.select((state) => state.userEdit.loading),
      { initialValue: false },
    );

    this.editError = toSignal(
      this.store.select((state) => state.userEdit.error),
      { initialValue: null },
    );

    effect(() => {
      if (this.deleteSuccess()) {
        this.router.navigate(['/users']);
      }
    });

    effect(() => {
      if (this.editSuccess()) {
        this.store.dispatch(setInitialStateEdit());
        this.modeEdit.set(false);
        this.store.dispatch(getUserDetail({ email: this.newEmail }));
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(setInitialStateUserDetail());
    this.store.dispatch(setInitialStateEdit());
    this.store.dispatch(setInitialStateDelete());
    this.route.paramMap.subscribe((params) => {
      const email = params.get('id') as string;
      this.store.dispatch(getUserDetail({ email }));
    });
  }

  public openModalDelete(): void {
    this.openModal.set(true);
    const user: IUser = this.userDetail()?.info!;
    this.store.dispatch(deleteUser({ user }));
  }

  public actionModalDelete(deleteUser: boolean): void {
    deleteUser ? this.store.dispatch(deleteUserConfirm()) : this.openModal.set(false);
  }

  public cancelEdition(): void {
    this.modeEdit.set(false);
  }

  public saveEdition(userDetail: IUserDetail): void {
    this.store.dispatch(setInitialStateEdit());
    this.newEmail = userDetail.info.email;
    this.store.dispatch(editUser({ oldEmail: this.userDetail()?.info.email!, userDetail }));
  }
}
