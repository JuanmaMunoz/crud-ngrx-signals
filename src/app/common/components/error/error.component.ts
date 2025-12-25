import { Component, Input } from '@angular/core';
import { fadeAndOut } from '../../animations/animations';
const timeDuration = 3000;
@Component({
  selector: 'app-error',
  imports: [],
  animations: [fadeAndOut(timeDuration)],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  @Input() errorDescription!: string;
  public visible: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = false;
    }, timeDuration + 1000);
  }
}
