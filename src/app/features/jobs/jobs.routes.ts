import { Routes } from '@angular/router';

export const JOBS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/job-ads/job-ads.component').then((a) => a.JobAdsComponent),
    },
    {
        path: 'search-result',
        loadComponent: () =>
            import('./pages/job-search-result/job-search-result.component').then(
                (a) => a.JobSearchResultComponent,
            ),
    },
    {
        path: 'details/:id',
        loadComponent: () =>
            import('./pages/job-details/job-details.component').then((a) => a.JobDetailsComponent),
    },
    {
        path: 'views',
        loadComponent: () =>
            import('./pages/job-views/job-views.component').then((a) => a.JobViewsComponent),
    },
];
