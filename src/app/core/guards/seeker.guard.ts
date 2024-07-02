import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const seekerGuard: CanActivateFn = () => {
	const router: Router = inject(Router);
	const storageService: StorageService = inject(StorageService);
	const seekerId = storageService.getSeekerIdentity();

	if (seekerId) {
		return true;
	} else {
		router.navigate(['/']);
		return false;
	}
};
