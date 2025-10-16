import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { LogoComponent } from '../../components/logo/logo.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, LoginFormComponent, LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
