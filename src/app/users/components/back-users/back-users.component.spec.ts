import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackUsersComponent } from './back-users.component';

describe('BackUsersComponent', () => {
  let component: BackUsersComponent;
  let fixture: ComponentFixture<BackUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
