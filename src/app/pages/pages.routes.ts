import { Routes } from '@angular/router';

export const PagesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages').then((m) => m.Pages),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
      },
    ],
  },
];
