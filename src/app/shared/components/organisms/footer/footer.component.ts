import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../atoms/logo/logo.component';

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [CommonModule, AngularSvgIconModule, LogoComponent],
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
	protected isVisible: boolean = false;

	ngOnInit(): void {
		window.addEventListener('scroll', this.onWindowScroll);
	}

	scrollToTop(): void {
		window.scrollTo({
			top: 0,
			left: 270,
			behavior: 'smooth',
		});
	}

	@HostListener('window:scroll', [])
	onWindowScroll() {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 20) {
			this.isVisible = true;
		} else if (scrolled <= 300) {
			this.isVisible = false;
		}
	}
}
