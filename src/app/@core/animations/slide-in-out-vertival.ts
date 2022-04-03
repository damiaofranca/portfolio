import { animate, style, transition, trigger } from '@angular/animations';



export const SlideInOutVertical = trigger('slideInOutVertical', [
  transition(':enter', [
    style({ transform: 'translateY(40%)', opacity: 0.2 }),
    animate('200ms ease-in', style({ transform: 'translateY(0%)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ transform: 'translateY(40%)', opacity: 0.2 }))
  ])
]);
