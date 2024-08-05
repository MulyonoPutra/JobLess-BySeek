import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { Providers } from './app.provider';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        MessageService,
        Providers,
        provideHttpClient(withInterceptorsFromDi(), withInterceptors([httpErrorInterceptor])),
        provideAnimations(),
        importProvidersFrom(BrowserAnimationsModule),
        provideRouter(routes),
        provideAngularSvgIcon(),
    ],
};
