import { Component } from '@angular/core';
import { fadeIn } from '../../animations/animations';

@Component({
  selector: 'app-about-me',
  imports: [],
  animations: [fadeIn()],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  public img: string = '/assets/images/photo.png';
  public imgGithub: string = '/assets/images/github.svg';
}
