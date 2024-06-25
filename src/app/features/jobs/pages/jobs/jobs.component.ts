import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { OverlayImageContainerComponent } from '../../../../shared/components/molecules/overlay-image-container/overlay-image-container.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SearchFieldComponent } from '../../../../shared/components/molecules/search-field/search-field.component';
import { CardJobAdsComponent } from '../../../../shared/components/molecules/card-job-ads/card-job-ads.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-jobs',
	standalone: true,
	imports: [
		CommonModule,
		OverlayImageContainerComponent,
		SearchFieldComponent,
		CardJobAdsComponent,
		AngularSvgIconModule,
	],
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
	overlayImage =
		'https://res.cloudinary.com/damu971dt/image/upload/v1718958396/Projects/alex-kotliarskyi-QBpZGqEMsKg-unsplash_hv7ltq.jpg';

	constructor(private readonly router: Router) {}

	ngOnInit(): void {}

	onDetails(id: string): void {
		this.router.navigateByUrl(`/jobs/details/${id}`);
	}

	onBookmark(): void {
		console.log('onBookmark');
	}
}
