import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  public imgAngular: string = 'assets/images/angular.svg';
  public imgNgrx: string = 'assets/images/ngrx.svg';
}
