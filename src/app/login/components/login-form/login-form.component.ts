import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, EventEmitter, Input, Output, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { fadeIn } from '../../../common/animations/animations';
import { InputPassComponent } from '../../../common/components/input-pass/input-pass.component';
import { InputTextComponent } from '../../../common/components/input-text/input-text.component';
import { IInput } from '../../../common/models/interfaces';

@Component({
  selector: 'app-login-form',
  imports: [InputTextComponent, InputPassComponent, ReactiveFormsModule],
  animations: [fadeIn()],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  @Input() loading!: Signal<boolean>;
  @Output() actionLogin = new EventEmitter<{ email: string; pass: string }>();
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
  public loginSuccess!: Signal<boolean>;
  public loginError!: Signal<HttpErrorResponse | null>;

  constructor() {
    effect(() => {
      if (this.loading()) {
        this.emailControl.disable();
        this.passControl.disable();
      } else {
        this.emailControl.enable();
        this.passControl.enable();
      }
    });
  }

  public login(): void {
    this.actionLogin.emit({
      email: this.emailControl.getRawValue(),
      pass: this.passControl.getRawValue(),
    });
  }
}
