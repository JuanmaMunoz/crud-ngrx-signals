import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  deleteUser,
  deleteUserConfirm,
  editUser,
  getUserDetail,
  setInitialStateDelete,
  setInitialStateEdit,
} from './../../store/actions/users.action';

import { provideRouter, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { statistics } from '../../../../assets/data/statistics';
import { users } from '../../../../assets/data/users';
import { unknownError } from '../../../common/utils/errors';
import {
  IUser,
  IUserDeleteState,
  IUserDetail,
  IUserEditState,
  IUserGetDetailState,
} from '../../models/interfaces';
import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;
  let router: Router;
  const userDetail: IUserDetail = { info: users[0], statistics: statistics[0] };
  const userDetailState: IUserGetDetailState = {
    userDetail,
    loading: false,
    error: null,
  };
  const userDeleteState: IUserDeleteState = {
    loading: false,
    error: null,
    success: false,
    user: null,
  };
  const userEditState: IUserEditState = {
    loading: false,
    error: null,
    success: false,
    userDetail: null,
    oldEmail: '',
  };

  const initialState = {
    userDetail: { ...userDetailState },
    userDelete: { ...userDeleteState },
    userEdit: { ...userEditState },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailComponent, BrowserAnimationsModule, NgxMaskDirective],
      providers: [provideMockStore({ initialState }), provideRouter([]), provideNgxMask()],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(DetailComponent);
    dispatchSpy = spyOn(store, 'dispatch');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dispatch setInitialStateDelete and router navigate when deleteSuccess is true', () => {
    store.setState({
      userDetail: { ...userDetailState },
      userDelete: {
        ...userDeleteState,
        success: true,
      },
      userEdit: { ...userEditState },
    });
    const routerSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(setInitialStateDelete());
    expect(routerSpy).toHaveBeenCalledWith(['/users']);
  });

  it('should openModal to be false when deleteError is true', () => {
    store.setState({
      userDetail: { ...userDetailState },
      userDelete: {
        ...userDeleteState,
        error: unknownError,
      },
      userEdit: { ...userEditState },
    });
    fixture.detectChanges();
    expect(component.openModal()).toBeFalse();
  });

  it('should call dispatch setInitalStateEdit, modeEdit to be false and dispatch getUserDatail when editSuccess is true', () => {
    store.setState({
      userDetail: { ...userDetailState },
      userDelete: { ...userDeleteState },
      userEdit: {
        ...userEditState,
        success: true,
      },
    });
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(setInitialStateEdit());
    expect(component.modeEdit()).toBeFalse();
    expect(dispatchSpy).toHaveBeenCalledWith(getUserDetail({ email: component.newEmail }));
  });

  it('should openModal to be true and  dispatch deleteUser when call openModalDelete', () => {
    component.openModalDelete();
    expect(component.openModal()).toBeTrue();
    const user = userDetail.info as IUser;
    expect(dispatchSpy).toHaveBeenCalledWith(deleteUser({ user }));
  });

  it('should call dispatch deleteUserConfirm when call actionMoodalDelete(true)', () => {
    component.actionModalDelete(true);
    expect(dispatchSpy).toHaveBeenCalledWith(deleteUserConfirm());
  });

  it('should openModal to be false and  call dispatch setInitialStateDelete when call actionMoodalDelete(false)', () => {
    component.actionModalDelete(false);
    expect(component.openModal()).toBeFalse();
    expect(dispatchSpy).toHaveBeenCalledWith(setInitialStateDelete());
  });

  it('should modeEdit to be false when call cancelEdition', () => {
    component.cancelEdition();
    expect(component.modeEdit()).toBeFalse();
  });

  it('should call dispatch setInitialStateEdit and edit user when call saveEdition', () => {
    component.saveEdition(userDetail);
    expect(dispatchSpy).toHaveBeenCalledWith(setInitialStateEdit());
    expect(dispatchSpy).toHaveBeenCalledWith(
      editUser({ oldEmail: userDetail.info.email!, userDetail }),
    );
  });

  it('should exist app-spinner', () => {
    store.setState({
      userDetail: { ...userDetailState, loading: true },
      userDelete: { ...userDeleteState },
      userEdit: { ...userEditState },
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const appSpinner = compiled.querySelector('app-spinner');
    expect(appSpinner).toBeTruthy();
  });

  it('should exist app-back-users, app-modal-delete, app-info', () => {
    store.setState({
      userDetail: { ...userDetailState },
      userDelete: { ...userDeleteState },
      userEdit: { ...userEditState },
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const appBackUsers = compiled.querySelector('app-back-users');
    const appInfo = compiled.querySelector('app-info');
    const appModalDelete = compiled.querySelector('app-modal-delete');
    expect(appBackUsers).toBeTruthy();
    expect(appInfo).toBeTruthy();
    expect(appModalDelete).toBeTruthy();
  });

  it('should exist app-edit-user-form when modeEdit is true', () => {
    store.setState({
      userDetail: { ...userDetailState },
      userDelete: { ...userDeleteState },
      userEdit: { ...userEditState },
    });
    component.modeEdit.set(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const appUserForm = compiled.querySelector('app-user-form');
    expect(appUserForm).toBeTruthy();
  });
});
