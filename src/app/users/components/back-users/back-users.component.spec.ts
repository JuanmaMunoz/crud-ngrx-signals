import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BackUsersComponent } from './back-users.component';

describe('BackUsersComponent', () => {
  let component: BackUsersComponent;
  let fixture: ComponentFixture<BackUsersComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackUsersComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BackUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a');
    expect(link!.getAttribute('href')).toBe('/users');
    expect(link?.textContent).toContain('Back to users');
  });
});
