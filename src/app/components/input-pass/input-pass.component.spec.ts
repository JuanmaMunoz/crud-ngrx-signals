import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPassComponent } from './input-pass.component';

describe('InputPassComponent', () => {
  let component: InputPassComponent;
  let fixture: ComponentFixture<InputPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
