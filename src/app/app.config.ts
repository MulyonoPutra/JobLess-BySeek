import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { appEffects, appStore } from './core/store/store';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { authenticationInterceptor } from './core/interceptors/authentication.interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        MessageService,
        provideHttpClient(
            withInterceptorsFromDi(),
            withInterceptors([httpErrorInterceptor, authenticationInterceptor]),
        ),
        provideStore(appStore),
        provideEffects(appEffects),
        provideAnimations(),
        importProvidersFrom(BrowserAnimationsModule),
        provideRouter(routes),
        provideAngularSvgIcon(),
    ],
};
