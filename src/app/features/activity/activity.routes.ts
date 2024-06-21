import { Routes } from '@angular/router';

export const ACTIVITY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/activity/activity.component').then((a) => a.ActivityComponent),
    children: [
      {
        path: 'saved-jobs',
        loadComponent: () =>
          import('./pages/saved-jobs/saved-jobs.component').then((a) => a.SavedJobsComponent),
      },
      {
        path: 'applied-jobs',
        loadComponent: () =>
          import('./pages/applied-jobs/applied-jobs.component').then((a) => a.AppliedJobsComponent),
      },
    ]
  },

]
