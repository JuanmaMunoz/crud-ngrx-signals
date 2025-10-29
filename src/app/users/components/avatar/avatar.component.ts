import { Component, Input } from '@angular/core';
import { IAvatar } from '../../models/interfaces';
import { ImgComponent } from '../img/img.component';

@Component({
  selector: 'app-avatar',
  imports: [ImgComponent],
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
