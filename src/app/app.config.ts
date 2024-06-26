import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

import { Providers } from './app.provider';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		HttpClientModule,
		provideHttpClient(),
		provideAnimations(),
		importProvidersFrom(BrowserAnimationsModule),
    ...Providers,
		provideRouter(routes),

		provideAngularSvgIcon(),
	],
};
