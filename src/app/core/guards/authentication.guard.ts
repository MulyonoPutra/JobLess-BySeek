import { Router, type CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { timer, take } from 'rxjs';
import { ToastService } from '../../shared/services/toast.service';

export const authenticationGuard: CanActivateFn = () => {
	const storageService: StorageService = inject(StorageService);
  const toastService: ToastService = inject(ToastService);
	const router: Router = inject(Router);

	const token = storageService.getAccessToken();
	if (!token) {
		timer(2000)
			.pipe(take(1))
			.subscribe(() => {
        toastService.showWarnToast('Info', 'You must login first to access this resource!');
				router.navigate(['/auth/login'], {
					replaceUrl: true,
				});
			});

		return false;
	}

	return true;
};
