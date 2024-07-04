import { Routes } from '@angular/router';
import { seekerGuard } from '../../core/guards/seeker.guard';

export const PROFILE_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./pages/profile/profile.component').then((a) => a.ProfileComponent),
	},
	{
		path: 'summary',
		loadComponent: () =>
			import('./components/summary-form/summary-form.component').then(
				(a) => a.SummaryFormComponent,
			),
	},
	{
		path: 'summary/:id',
		loadComponent: () =>
			import('./components/summary-form/summary-form.component').then(
				(a) => a.SummaryFormComponent,
			),
	},
];
