import { Component, input } from '@angular/core';
import { fadeIn } from '../../../common/animations/animations';
import { IBoxInfo } from '../../models/interfaces';

@Component({
  selector: 'app-box-info',
  imports: [],
  animations: [fadeIn()],
  templateUrl: './box-info.component.html',
  styleUrl: './box-info.component.scss',
})
export class BoxInfoComponent {
  boxInfo = input.required<IBoxInfo>();
}
