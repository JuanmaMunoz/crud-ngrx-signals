/* istanbul ignore file */
import {
  animate,
  AnimationMetadata,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeIn = (delay: number = 1500): AnimationTriggerMetadata => {
  const definitions: AnimationMetadata[] = [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(`${delay}ms ease-out`, style({ opacity: 1 })),
    ]),
  ];
  return trigger('fadeIn', definitions);
};

export const fadeInModal = (delay: number = 500): AnimationTriggerMetadata => {
  const definitions: AnimationMetadata[] = [
    transition('false => true', [
      style({ opacity: 0 }),
      animate(`${delay}ms ease-out`, style({ opacity: 1 })),
    ]),
    transition('true => false', [
      style({ opacity: 1 }),
      animate(`${delay}ms ease-out`, style({ opacity: 0 })),
    ]),
  ];
  return trigger('fadeInModal', definitions);
};

export const fadeAndOut = (duration: number = 3000): AnimationTriggerMetadata => {
  const definitions: AnimationMetadata[] = [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('500ms ease-in', style({ opacity: 1 })),
      animate(`${duration}ms`, style({ opacity: 1 })),
      animate('500ms ease-out', style({ opacity: 0 })),
    ]),
  ];
  return trigger('fadeAndOut', definitions);
};
