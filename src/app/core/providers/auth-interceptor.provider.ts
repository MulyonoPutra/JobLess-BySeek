import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
