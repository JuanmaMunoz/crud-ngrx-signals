import { Component } from '@angular/core';
import { scaleFadeIn } from '../../animations/animations';

@Component({
  selector: 'app-logo',
  imports: [],
  animations: [scaleFadeIn(1000)],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  public imgAngular = 'assets/images/angular.svg';
  public imgNgrx = 'assets/images/ngrx.svg';
}
