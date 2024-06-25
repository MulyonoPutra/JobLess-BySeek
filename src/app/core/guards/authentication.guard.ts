import { Router, type CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { timer, take } from 'rxjs';

export const authenticationGuard: CanActivateFn = () => {
	const storageService: StorageService = inject(StorageService);
	const router: Router = inject(Router);

	const token = storageService.getAccessToken();
	if (!token) {
		timer(2000)
			.pipe(take(1))
			.subscribe(() => {
				alert('You must login first to access this resource!');
				router.navigate(['/auth/login'], {
					replaceUrl: true,
				});
			});

		return false;
	}

	return true;
};
