import {
    HttpErrorResponse,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { ToastService } from '../../shared/services/toast.service';
import { inject } from '@angular/core';

export const httpErrorInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
) => {
    const toast: ToastService = inject(ToastService);
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = '';

            if (error.error instanceof ErrorEvent) {
                console.error('An error occurred:', error.error.message);
                errorMessage = 'An error occurred ' + error.error.message;
            } else {
                console.error('Backend returned code ' + error.status, 'Message: ' + error.message);
                errorMessage =
                    'Backend returned code ' + error.status + 'Message: ' + error.message;
            }

            if (error.status === 404) {
                errorMessage = 'Not Found';
            } else if (error.status === 500) {
                errorMessage = 'Internal Server Error';
            } else if (error.status === 401) {
                errorMessage = 'Unauthorized';
            } else if (error.status === 409) {
                errorMessage = 'You already applied to this application..';
            } else {
                errorMessage = 'An error occurred';
            }

            toast.showErrorToast('Error', errorMessage);
            return throwError(() => errorMessage);
        }),
    );
};
