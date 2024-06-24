import { Routes } from '@angular/router';

export const COMPANY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/company/company.component').then((a) => a.CompanyComponent),
  },
]
