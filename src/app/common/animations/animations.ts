/* istanbul ignore file */
import { animate, style, transition, trigger } from '@angular/animations';
export const fadeIn = (delay: number = 1500) =>
  trigger('fadeIn', [
    // Estado inicial (void o *): opacidad 0
    transition(':enter', [
      style({ opacity: 0 }),
      // Animación a estado final: opacidad 1 durante 1.5s
      animate(`${delay}ms ease-out`, style({ opacity: 1 })),
    ]),
  ]);

export const fadeInModal = (delay: number = 500) =>
  trigger('fadeInModal', [
    transition('false=>true', [
      style({ opacity: 0 }),
      animate(`${delay}ms ease-out`, style({ opacity: 1 })),
    ]),
    transition('true=>false', [
      style({ opacity: 1, display: 'block' }),
      animate(`${delay}ms ease-out`, style({ opacity: 0 })),
    ]),
  ]);

export const fadeAndOut = (duration: number = 3000) =>
  trigger('fadeAndOut', [
    transition(':enter', [
      style({ opacity: 0, display: 'block' }),
      animate('500ms ease-in', style({ opacity: 1 })),
      animate(`${duration}ms`, style({ opacity: 1 })),
      animate('500ms ease-out', style({ opacity: 0 })),
    ]),
  ]);
