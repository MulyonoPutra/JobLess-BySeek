import { PageNotFoundComponent } from './core/layout/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/main/main.component').then((c) => c.MainComponent),
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profiles/profile.routes').then((a) => a.PROFILE_ROUTES)
      },
      {
        path: 'activity',
        loadChildren: () =>
          import('./features/activity/activity.routes').then((a) => a.ACTIVITY_ROUTES)
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authentication/authentication.routes').then((a) => a.AUTH_ROUTES)
  },
  { path: "**", component: PageNotFoundComponent }
];
