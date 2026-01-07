import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
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
    RouterModule,
    BackUsersComponent,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit, OnDestroy {
  public openModal: WritableSignal<boolean> = signal<boolean>(false);
  public modeEdit: WritableSignal<boolean> = signal<boolean>(false);
  public newEmail = '';

  private store = inject(
    Store<{
      userDetail: IUserGetDetailState;
      userDelete: IUserDeleteState;
      userEdit: IUserEditState;
    }>,
  );
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public userDetail: Signal<IUserDetail | null> = toSignal(
    this.store.select((state) => state.userDetail.userDetail),
    { initialValue: null },
  );

  public userDetailLoading: Signal<boolean> = toSignal(
    this.store.select((state) => state.userDetail.loading),
    { initialValue: false },
  );

  public userDetailError: Signal<HttpErrorResponse | null> = toSignal(
    this.store.select((state) => state.userDetail.error),
    { initialValue: null },
  );

  public deleteUser: Signal<IUser | null> = toSignal(
    this.store.select((state) => state.userDelete.user),
    { initialValue: null },
  );

  public deleteSuccess: Signal<boolean> = toSignal(
    this.store.select((state) => state.userDelete.success),
    { initialValue: false },
  );

  public deleteError: Signal<HttpErrorResponse | null> = toSignal(
    this.store.select((state) => state.userDelete.error),
    { initialValue: null },
  );

  public deleteLoading: Signal<boolean> = toSignal(
    this.store.select((state) => state.userDelete.loading),
    { initialValue: false },
  );

  public editSuccess: Signal<boolean> = toSignal(
    this.store.select((state) => state.userEdit.success),
    { initialValue: false },
  );

  public editLoading: Signal<boolean> = toSignal(
    this.store.select((state) => state.userEdit.loading),
    { initialValue: false },
  );

  public editError: Signal<HttpErrorResponse | null> = toSignal(
    this.store.select((state) => state.userEdit.error),
    { initialValue: null },
  );

  private deleteSuccessEffect = effect(() => {
    if (this.deleteSuccess()) {
      this.router.navigate(['/users']);
      this.store.dispatch(setInitialStateDelete());
    }
  });

  private deleteErrorEffect = effect(() => {
    if (this.deleteError()) {
      this.openModal.set(false);
    }
  });

  private editSuccessEffect = effect(() => {
    if (this.editSuccess()) {
      this.store.dispatch(setInitialStateEdit());
      this.modeEdit.set(false);
      this.store.dispatch(getUserDetail({ email: this.newEmail }));
    }
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const email = params.get('id') as string;
      this.store.dispatch(getUserDetail({ email }));
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(setInitialStateUserDetail());
    this.store.dispatch(setInitialStateEdit());
    this.store.dispatch(setInitialStateDelete());
  }

  public openModalDelete(): void {
    this.store.dispatch(setInitialStateDelete());
    this.openModal.set(true);
    const user: IUser = this.userDetail()!.info!;
    this.store.dispatch(deleteUser({ user }));
  }

  public actionModalDelete(deleteUser: boolean): void {
    if (deleteUser) {
      this.store.dispatch(deleteUserConfirm());
    } else {
      this.openModal.set(false);
      this.store.dispatch(setInitialStateDelete());
    }
  }

  public cancelEdition(): void {
    this.modeEdit.set(false);
  }

  public saveEdition(userDetail: IUserDetail): void {
    this.store.dispatch(setInitialStateEdit());
    this.newEmail = userDetail.info.email;
    this.store.dispatch(editUser({ oldEmail: this.userDetail()!.info.email!, userDetail }));
  }
}
