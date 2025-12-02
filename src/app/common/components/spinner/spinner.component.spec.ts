import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';

fdescribe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const spinner = compiled.querySelector('.spinner');
    const spinnerBorder = compiled.querySelector('.spinner-border');
    expect(spinner).toBeTruthy();
    expect(spinnerBorder).toBeTruthy();
  });
});
