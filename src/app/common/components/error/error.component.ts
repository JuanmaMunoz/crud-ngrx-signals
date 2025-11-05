import { Component, Input } from '@angular/core';
import { fadeIn } from '../../animations/animations';

@Component({
  selector: 'app-error',
  imports: [],
  animations: [fadeIn(500)],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  @Input() errorDescription!: string;
}
