import { Routes } from '@angular/router';
import { companyResolver } from './resolver/company.resolver';

export const COMPANY_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./pages/company/company.component').then((a) => a.CompanyComponent),
	},
	{
		path: 'details/:id',
		loadComponent: () =>
			import('./pages/company-details/company-details.component').then(
				(a) => a.CompanyDetailsComponent,
			),
		resolve: {
			data: companyResolver,
		},
		children: [
			{
				path: '',
				redirectTo: 'overview',
				pathMatch: 'full',
			},
			{
				path: 'overview',
				loadComponent: () =>
					import('./pages/company-overview/company-overview.component').then(
						(a) => a.CompanyOverviewComponent,
					),
			},
			{
				path: 'job-ads',
				loadComponent: () =>
					import('./pages/job-ads-by-company/job-ads-by-company.component').then(
						(a) => a.JobAdsByCompanyComponent,
					),
			},
		],
	},
];
