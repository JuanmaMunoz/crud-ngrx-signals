import { Component } from '@angular/core';
import { fadeIn } from '../../animations/animations';

@Component({
  selector: 'app-about-me',
  imports: [],
  animations: [fadeIn(1000)],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  public img = 'assets/images/photo.png';
}
