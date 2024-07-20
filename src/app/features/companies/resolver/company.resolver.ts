import { CompanyService } from '../services/company.service';
import type { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

export const companyResolver: ResolveFn<any> = (route, state) => {
    const companyService: CompanyService = inject(CompanyService);
    const companyId = route.paramMap.get('id')!;
    return companyService.findById(companyId);
};
