import { Component } from '@angular/core';
import { fadeIn } from '../../animations/animations';

@Component({
  selector: 'app-info-crud',
  imports: [],
  animations: [fadeIn()],
  templateUrl: './info-crud.component.html',
  styleUrl: './info-crud.component.scss',
})
export class InfoCrudComponent {}
