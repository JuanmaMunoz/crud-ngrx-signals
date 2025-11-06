import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './error.component';

fdescribe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist', () => {
    const error = 'Unkonwn error';
    component.errorDescription = error;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const h4 = compiled.querySelector('h4');
    const p = compiled.querySelector('p');
    expect(h4?.textContent).toContain('Error:');
    expect(p?.textContent).toContain(error);
  });
});
