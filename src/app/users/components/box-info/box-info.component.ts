import { Component, Input, Signal } from '@angular/core';
import { IBoxInfo } from '../../models/interfaces';

@Component({
  selector: 'app-box-info',
  imports: [],
  templateUrl: './box-info.component.html',
  styleUrl: './box-info.component.scss',
})
export class BoxInfoComponent {
  @Input() boxInfo!: Signal<IBoxInfo>;
}
