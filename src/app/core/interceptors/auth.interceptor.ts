import type { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>,
  next: HttpHandlerFn) => {
  const storageService: StorageService = inject(StorageService);
  const router: Router = inject(Router);
  return next(req);
};
