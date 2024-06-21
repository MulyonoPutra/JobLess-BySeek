import { Routes } from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/profile/profile.component').then((a) => a.ProfileComponent),
  },
  {
    path: 'forms',
    loadComponent: () =>
      import('./pages/profile-forms/profile-forms.component').then((a) => a.ProfileFormsComponent),
  },
]
