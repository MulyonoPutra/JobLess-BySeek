import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { Providers } from './app.provider';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
    MessageService,
		Providers,
		HttpClientModule,
		provideHttpClient(),
		provideAnimations(),
		importProvidersFrom(BrowserAnimationsModule),
		provideRouter(routes),
		provideHttpClient(withInterceptorsFromDi()),
		provideAngularSvgIcon(),
	],
};
