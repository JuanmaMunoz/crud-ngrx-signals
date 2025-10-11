import { Component, Input, Signal } from '@angular/core';
import { IUserDetail } from '../../models/interfaces';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  @Input() userDetail!: Signal<IUserDetail>;
}
