import { PageNotFoundComponent } from './core/layout/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';
import { authenticationGuard } from './core/guards/authentication.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./core/layout/main/main.component').then((c) => c.MainComponent),
        children: [
            { path: '', redirectTo: '/jobs', pathMatch: 'full' },
            {
                path: 'profile',
                loadChildren: () =>
                    import('./features/profiles/profile.routes').then((a) => a.PROFILE_ROUTES),
                data: {
                    role: 'seeker',
                },
            },
            {
                path: 'activity',
                loadChildren: () =>
                    import('./features/activity/activity.routes').then((a) => a.ACTIVITY_ROUTES),
            },
            {
                path: 'company',
                loadChildren: () =>
                    import('./features/companies/company.routes').then((a) => a.COMPANY_ROUTES),
            },
            {
                path: 'jobs',
                loadChildren: () =>
                    import('./features/jobs/jobs.routes').then((a) => a.JOBS_ROUTES),
                // canActivate: [authenticationGuard]
            },
            {
                path: 'settings',
                loadChildren: () =>
                    import('./features/settings/settings.routes').then((a) => a.SETTINGS_ROUTES),
                data: {
                    role: 'seeker',
                },
            },
        ],
        canActivate: [authenticationGuard],
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./features/authentication/authentication.routes').then((a) => a.AUTH_ROUTES),
    },
    { path: '**', component: PageNotFoundComponent },
];
