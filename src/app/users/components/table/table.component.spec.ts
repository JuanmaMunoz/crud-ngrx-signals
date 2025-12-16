import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { users } from '../../../../assets/data/users';
import { IUser } from '../../models/interfaces';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  const usersList = users;
  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [TableComponent, NgxMaskDirective, BrowserAnimationsModule],
      providers: [provideNgxMask(), { provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.users = signal<IUser[]>(usersList);
    component.loading = signal<boolean>(false);
    component.currentPage = signal<number>(1);
    component.totalPages = signal<number>(3);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to users/detail', () => {
    const email = 'user@test.es';
    component.userDetail(email);
    expect(routerSpy.navigate).toHaveBeenCalledWith([`users/detail/`, email]);
  });

  it('should set page when changePage is called', () => {
    component.changePage(2);
    expect(component.page()).toBe(2);
    component.changePage(4);
    expect(component.page()).toBe(3);
  });

  it('should call actionDeleteUser.emit when openModalDelete is called', () => {
    spyOn(component.actionDeleteUser, 'emit');
    const userToDelete: IUser = usersList[0];
    const mouseEvent = new MouseEvent('click');
    component.openModalDelete(userToDelete, mouseEvent);
    expect(component.actionDeleteUser.emit).toHaveBeenCalledWith(userToDelete);
  });

  it('should set page when nextPage is called', () => {
    const page = component.page();
    component.nextPage();
    expect(component.page()).toBe(page + 1);
    component.page.set(0);
    component.nextPage();
    expect(component.page()).toBe(1);
  });

  it('should set page when previousPage is called', () => {
    component.page.set(2);
    const page = component.page();
    component.previousPage();
    expect(component.page()).toBe(page - 1);
  });

  it('should exist table and buttons elements in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
    expect(compiled.querySelector('table')).toBeTruthy();
  });
});
