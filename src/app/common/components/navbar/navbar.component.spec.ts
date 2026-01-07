import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { ITokenState } from '../../models/interfaces';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const tokenInitialState: ITokenState = {
    token: 'fake token xxxxxxxx....',
    jwt: { email: 'test@test', expiration: new Date().getTime() + 5000 },
    error: null,
  };

  const initialState = {
    token: tokenInitialState,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, BrowserAnimationsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call actionLogout.emit when logout is called', () => {
    const actionSpy = spyOn(component.actionLogout, 'emit');
    component.logout();
    expect(actionSpy).toHaveBeenCalled();
  });

  it('should exist', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('img');
    const spans = compiled.querySelectorAll('span');
    const link = compiled.querySelector('a');
    expect(images.length).toBe(2);
    expect(spans.length).toBe(5);
    expect(spans[2].textContent).toContain(initialState.token.jwt?.email);
    expect(link).toBeTruthy();
  });
});
