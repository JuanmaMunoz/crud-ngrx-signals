import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { signal } from '@angular/core';
import { users } from '../../../../assets/data/users';
import { IUser } from '../../models/interfaces';
import { ModalDeleteComponent } from './modal-delete.component';

fdescribe('ModalDeleteComponent', () => {
  let component: ModalDeleteComponent;
  let fixture: ComponentFixture<ModalDeleteComponent>;
  const deleteUser: IUser = users[0];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeleteComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDeleteComponent);
    component = fixture.componentInstance;
    component.deleteUser = signal<IUser | null>(deleteUser);
    component.openModal = signal<boolean>(true);
    component.deleteLoading = signal<boolean>(false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call actionDelete emit with false', () => {
    spyOn(component.actionDelete, 'emit');
    component.cancelDeleting();
    expect(component.actionDelete.emit).toHaveBeenCalledWith(false);
  });

  it('should call actionDelete emit with true', () => {
    spyOn(component.actionDelete, 'emit');
    component.confirmDeleting();
    expect(component.actionDelete.emit).toHaveBeenCalledWith(true);
  });

  it('should exist spinner-border when deleteLoading is true', () => {
    component.deleteLoading = signal<boolean>(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const spinner = compiled.querySelector('.spinner-border');
    expect(spinner).toBeTruthy();
  });

  it('should exist description and user info', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const description = compiled.querySelector('p');
    expect(description?.textContent).toContain('Do you want to delete this user ?');
    const infoUser = compiled.querySelectorAll('.text-primary');
    expect(infoUser[0]?.textContent).toContain(deleteUser.name);
    expect(infoUser[1]?.textContent).toContain(deleteUser.email);
  });

  it('should exist cancel and delete buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    const buttonEdit = buttons[0];
    const buttonDelete = buttons[1];
    expect(buttonEdit).toBeTruthy();
    expect(buttonEdit.textContent).toContain('Cancel');
    expect(buttonDelete).toBeTruthy();
    expect(buttonDelete.textContent).toContain('Delete');
  });
});
