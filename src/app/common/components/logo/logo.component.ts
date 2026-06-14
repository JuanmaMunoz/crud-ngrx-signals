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
  protected imgAngular = 'assets/images/angular.svg';
  protected imgNgrx = 'assets/images/ngrx.svg';
}
