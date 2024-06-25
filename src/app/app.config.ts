import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

import { AuthInterceptorProvider } from './core/providers/auth-interceptor.provider';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		HttpClientModule,
		provideHttpClient(),
		provideAnimations(),
		importProvidersFrom(BrowserAnimationsModule),
		AuthInterceptorProvider,
		provideRouter(routes),

		provideAngularSvgIcon(),
	],
};
