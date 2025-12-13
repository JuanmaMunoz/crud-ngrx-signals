import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  const loading = signal<boolean>(false);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, NgxMaskDirective],
      providers: [provideNgxMask()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    component.loading = loading;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call actionLogin to call login', () => {
    const spyActionLogin = spyOn(component.actionLogin, 'emit');
    component.login();
    expect(spyActionLogin).toHaveBeenCalledOnceWith({
      email: component.emailControl.getRawValue(),
      pass: component.passControl.getRawValue(),
    });
  });

  it('should disable buttons and inputs when loading is true', async () => {
    loading.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttonLogin = compiled.querySelector('button');
    const spinner = compiled.querySelector('.spinner-border');
    expect(spinner).toBeTruthy();
    expect(buttonLogin?.disabled).toBeTruthy;
    expect(component.emailControl.disabled).toBeTrue();
    expect(component.passControl.disabled).toBeTrue();
  });

  it('should enable buttons and inputs when loading is false', async () => {
    loading.set(false);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttonLogin = compiled.querySelector('button');
    const spinner = compiled.querySelector('.spinner-border');
    expect(spinner).toBeFalsy();
    expect(buttonLogin?.disabled).toBeFalse;
    expect(component.emailControl.disabled).toBeFalse();
    expect(component.passControl.disabled).toBeFalse();
  });
});
