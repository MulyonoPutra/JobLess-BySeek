import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const storageService: StorageService = inject(StorageService);
  const router: Router = inject(Router);
  const token = storageService.getAccessToken();
  const role = storageService.getRole();

  if (token) {
    if (route.data['role'] && route.data['role'].indexOf(role) === -1) {
      router.navigate(['/']);
      return false;
    }
  }
  return true;
};
