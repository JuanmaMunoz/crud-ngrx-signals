import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ErrorComponent } from '../../../common/components/error/error.component';
import { InputPassComponent } from '../../../common/components/input-pass/input-pass.component';
import { InputTextComponent } from '../../../common/components/input-text/input-text.component';
import { IInput } from '../../../common/models/interfaces';
import { ILoginState } from '../../models/interfaces';
import {
  login,
  setInitialStateLogin,
  setInitialStateLogout,
} from '../../store/actions/login.action';

@Component({
  selector: 'app-login-form',
  imports: [InputTextComponent, InputPassComponent, ReactiveFormsModule, ErrorComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  public loginForm = new FormGroup({
    email: new FormControl('user@test', [Validators.required, Validators.email]),
    pass: new FormControl('ajk38jkÑ', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
    ]),
  });
  public emailControl: FormControl = this.loginForm.get('email') as FormControl;
  public passControl: FormControl = this.loginForm.get('pass') as FormControl;

  public validationErrors: Record<string, string> = {
    email: 'The email format is invalid',
    minlength: 'The minimum password length is 4',
    maxlength: 'The maximum password length is 8',
    required: 'The field is required',
  };

  public emailInput = signal<IInput>({
    control: this.emailControl,
    placeholder: 'Insert email',
    label: 'Email',
    focus: true,
    validationErrors: this.validationErrors,
  });

  public passInput = signal<IInput>({
    control: this.passControl,
    placeholder: 'Insert password',
    label: 'Password',
    focus: true,
    validationErrors: this.validationErrors,
  });
  public loading!: Signal<boolean>;
  public loginSuccess!: Signal<boolean>;
  public loginError!: Signal<HttpErrorResponse | null>;

  constructor(
    private store: Store<{ login: ILoginState; logout: ILoginState }>,
    private router: Router,
  ) {
    this.loading = toSignal(
      this.store.select((state) => state.login.loading),
      { initialValue: false },
    );

    this.loginSuccess = toSignal(
      this.store.select((state) => state.login.success),
      { initialValue: false },
    );

    this.loginError = toSignal(
      this.store.select((state) => state.login.error),
      { initialValue: null },
    );

    effect(() => {
      if (this.loading()) {
        this.emailControl.disable();
        this.passControl.disable();
      } else {
        this.emailControl.enable();
        this.passControl.enable();
      }
    });

    effect(() => {
      if (this.loginSuccess()) {
        this.router.navigate(['/users']);
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(setInitialStateLogin());
    this.store.dispatch(setInitialStateLogout());
  }

  public login(): void {
    this.store.dispatch(
      login({
        email: this.emailControl.getRawValue(),
        pass: this.passControl.getRawValue(),
      }),
    );
  }
}
