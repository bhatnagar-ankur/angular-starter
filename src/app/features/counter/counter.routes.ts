import { Routes } from '@angular/router';

export const COUNTER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./counter').then((m) => m.Counter),
  },
];
