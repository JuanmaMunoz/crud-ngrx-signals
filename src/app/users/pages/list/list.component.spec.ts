import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { users } from '../../../../assets/data/users';
import { unknownError } from '../../../common/utils/errors';
import { IUserDeleteState, IUsersState } from '../../models/interfaces';
import {
  deleteUser,
  deleteUserConfirm,
  getUsers,
  setInitialStateDelete,
} from '../../store/actions/users.action';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const usersState: IUsersState = {
    users: users.slice(0, 10),
    loading: false,
    error: null,
    totalPages: 5,
    page: 1,
    search: '',
  };

  const userDeleteState: IUserDeleteState = {
    loading: false,
    error: null,
    success: false,
    user: null,
  };
  const initialState = {
    users: { ...usersState },
    userDelete: { ...userDeleteState },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent, NgxMaskDirective, BrowserAnimationsModule],
      providers: [provideMockStore({ initialState }), provideRouter([]), provideNgxMask()],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ListComponent);
    dispatchSpy = spyOn(store, 'dispatch');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should openModal to be false, call dispatch setInitialStateDelete and dispatch getUsers when successDelete to be true ', () => {
    store.setState({
      users: { ...usersState },
      userDelete: { ...userDeleteState, success: true },
    });
    fixture.detectChanges();
    expect(component.openModal()).toBeFalse();
    expect(dispatchSpy).toHaveBeenCalledWith(setInitialStateDelete());
    expect(dispatchSpy).toHaveBeenCalledWith(getUsers(component.params()!));
  });

  it('should openModal to be true when errorDelete to be false', () => {
    store.setState({
      users: { ...usersState },
      userDelete: { ...userDeleteState, error: unknownError },
    });
    fixture.detectChanges();
    expect(component.openModal()).toBeFalse();
  });

  it('should openModal to be true, and dispatch deleteUser when openModalDelete is called', () => {
    const user = users[0];
    component.openModalDelete(user);
    expect(component.openModal()).toBeTrue();
    expect(dispatchSpy).toHaveBeenCalledWith(deleteUser({ user }));
  });

  it('should call dispatch deleteUserConfirm when actionMoodalDelete(true) is called', () => {
    component.actionModalDelete(true);
    expect(dispatchSpy).toHaveBeenCalledWith(deleteUserConfirm());
  });

  it('should openModal to be false and  call dispatch setInitialStateDelete when actionMoodalDelete(false) is called', () => {
    component.actionModalDelete(false);
    expect(component.openModal()).toBeFalse();
    expect(dispatchSpy).toHaveBeenCalledWith(setInitialStateDelete());
  });

  it('should update params when changePage is called', () => {
    component.changePage(2);
    expect(component.params()?.page).toBe(2);
  });

  it('should not update params when searchUsers is called', () => {
    component.searchUsers('test');
    expect(component.params()?.search).toBe('test');
  });
});
