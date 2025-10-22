import { animate, style, transition, trigger } from '@angular/animations';
export const fadeIn = (delay?: number) =>
  trigger('fadeIn', [
    // Estado inicial (void o *): opacidad 0
    transition(':enter', [
      style({ opacity: 0 }),
      // Animación a estado final: opacidad 1 durante 1.5s
      animate(`${delay ? delay : 1500}ms ease-out`, style({ opacity: 1 })),
    ]),
  ]);
