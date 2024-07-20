import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';

export const Providers: Provider[] = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
