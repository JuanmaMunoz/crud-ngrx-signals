import { Component, Input } from '@angular/core';
import { fadeIn } from '../../../common/animations/animations';
import { IAvatar } from '../../models/interfaces';
import { ImgComponent } from '../img/img.component';

@Component({
  selector: 'app-avatar',
  imports: [ImgComponent],
  animations: [fadeIn(500)],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() avatar: IAvatar = {
    title: 'New User',
    description: 'Insert new user in the system',
    modeRow: true,
  };
}
