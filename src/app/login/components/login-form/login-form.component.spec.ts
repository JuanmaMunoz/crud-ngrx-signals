import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, NgxMaskDirective, BrowserAnimationsModule],
      providers: [provideNgxMask()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call actionLogin when login is called', () => {
    const spyActionLogin = spyOn(component.actionLogin, 'emit');
    component.login();
    expect(spyActionLogin).toHaveBeenCalledOnceWith({
      email: component.emailControl.getRawValue(),
      pass: component.passControl.getRawValue(),
    });
  });

  it('should disable buttons and inputs when loading is true', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const loginButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    const spinner = compiled.querySelector('.spinner-border');
    expect(spinner).toBeTruthy();
    expect(loginButton?.disabled).toBeTrue();
    expect(component.emailControl.disabled).toBeTrue();
    expect(component.passControl.disabled).toBeTrue();
  });

  it('should enable buttons and inputs when loading is false', () => {
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const loginButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    const spinner = compiled.querySelector('.spinner-border');
    expect(spinner).toBeFalsy();
    expect(loginButton?.hasAttribute('disabled')).toBeFalse();
    expect(component.emailControl.disabled).toBeFalse();
    expect(component.passControl.disabled).toBeFalse();
  });
});
