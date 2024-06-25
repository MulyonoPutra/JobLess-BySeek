import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/components/organisms/footer/footer.component';
import { NavbarComponent } from '../../../shared/components/organisms/navbar/navbar.component';

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
	template: `
		<app-navbar></app-navbar>
		<main>
			<div
				[ngClass]="{
					'max-w-[55rem]': !isFullWidthRoute,
					'max-w-[85rem]': isFullWidthRoute,
				}"
				class="mx-auto pt-4 pb-10 px-4 sm:px-6 lg:px-8 md:pt-32">
				<router-outlet></router-outlet>
			</div>
		</main>
		<app-footer></app-footer>
	`,
})
export class MainComponent {
	private currentRoute!: string;
	private fullWidthRoutes: string[] = ['/company', '/profile', '/jobs'];

	constructor(private router: Router) {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.currentRoute = event.urlAfterRedirects;
			}
		});
	}

	get isFullWidthRoute(): boolean {
		return this.fullWidthRoutes.includes(this.currentRoute);
	}
}
