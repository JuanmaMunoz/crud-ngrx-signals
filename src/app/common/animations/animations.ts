/* istanbul ignore file */
import {
  animate,
  AnimationMetadata,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeIn = (delay = 1500): AnimationTriggerMetadata => {
  const definitions: AnimationMetadata[] = [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(`${delay}ms ease-out`, style({ opacity: 1 })),
    ]),
  ];
  return trigger('fadeIn', definitions);
};

export const fadeInModal = (delay = 500): AnimationTriggerMetadata => {
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

export const inAndOut = (duration = 3000): AnimationTriggerMetadata => {
  const definitions: AnimationMetadata[] = [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('500ms ease-in', style({ opacity: 1 })),
      animate(`${duration}ms`, style({ opacity: 1 })),
      animate('500ms ease-out', style({ opacity: 0 })),
    ]),
  ];
  return trigger('inAndOut', definitions);
};

export const scaleFadeIn = (duration = 500): AnimationTriggerMetadata => {
  const definitions: AnimationMetadata[] = [
    transition(':enter', [
      style({
        transform: 'scale(0.5)',
        opacity: 0,
      }),
      animate(
        `${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        style({
          transform: 'scale(1)',
          opacity: 1,
        }),
      ),
    ]),
  ];

  return trigger('scaleFadeIn', definitions);
};
