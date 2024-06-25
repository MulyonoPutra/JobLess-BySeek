import { Routes } from '@angular/router';

export const JOBS_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/jobs/jobs.component').then((a) => a.JobsComponent),
	},
	{
		path: 'results',
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
];
