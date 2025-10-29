import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutMeComponent } from '../../../common/components/about-me/about-me.component';
import { InfoCrudComponent } from '../../../common/components/info-crud/info-crud.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, LoginFormComponent, InfoCrudComponent, AboutMeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
