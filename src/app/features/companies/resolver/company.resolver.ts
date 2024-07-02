import { DestroyRef, inject } from '@angular/core';

import { CompanyService } from '../services/company.service';
import type { ResolveFn } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

export const companyResolver: ResolveFn<any> = (route, state) => {
	const companyService: CompanyService = inject(CompanyService);
	const destroyRef: DestroyRef = inject(DestroyRef);
	const companyId = route.paramMap.get('id')!;
	return companyService.findById(companyId);
};
