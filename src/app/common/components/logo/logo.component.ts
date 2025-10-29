import { Component } from '@angular/core';
import { fadeIn } from '../../animations/animations';

@Component({
  selector: 'app-logo',
  imports: [],
  animations: [fadeIn(1000)],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  public imgAngular: string = 'assets/images/angular.svg';
  public imgNgrx: string = 'assets/images/ngrx.svg';
}
