import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from '../modal/modal.component';
import { ModalErrorComponent } from './modal-error.component';

describe('ModalErrorComponent', () => {
  let component: ModalErrorComponent;
  let fixture: ComponentFixture<ModalErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalErrorComponent, BrowserAnimationsModule, ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalErrorComponent);
    component = fixture.componentInstance;
    component.errorMessage = signal('Unknown error');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const modal = compiled.querySelector('app-modal');
    const h3 = compiled.querySelector('h3');
    const p = compiled.querySelector('p');
    const button = compiled.querySelector('button');
    expect(modal).toBeTruthy();
    expect(h3?.textContent).toContain('Error');
    expect(p?.textContent).toContain(component.errorMessage());
    expect(button).toBeTruthy();
  });

  it('should change visibility status on button click', () => {
    component.closeModal();
    fixture.detectChanges();
    expect(component.openModal()).toBeFalsy();
  });
});
