import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal, WritableSignal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  const visible: WritableSignal<boolean> = signal(true);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.visible = visible;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const contentHeader = compiled.querySelector('.modal-header');
    const contentBody = compiled.querySelector('.modal-body');
    const contentFooter = compiled.querySelector('.modal-footer');
    expect(contentHeader).toBeTruthy();
    expect(contentBody).toBeTruthy();
    expect(contentFooter).toBeTruthy();
  });

  it('should show modal', () => {
    visible.set(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const modal = compiled.querySelector('.modal');
    expect(getComputedStyle(modal!).display).toBe('block');
  });

  it('should hide modal', async () => {
    visible.set(false);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const modal = compiled.querySelector('.modal');
    expect(getComputedStyle(modal!).display).toBe('none');
  });
});
