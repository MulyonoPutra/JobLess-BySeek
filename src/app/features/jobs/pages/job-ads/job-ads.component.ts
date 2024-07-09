import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CardJobAdsComponent } from '../../../../shared/components/molecules/card-job-ads/card-job-ads.component';
import { OverlayImageContainerComponent } from '../../../../shared/components/molecules/overlay-image-container/overlay-image-container.component';
import { SearchFieldComponent } from '../../../../shared/components/molecules/search-field/search-field.component';

import { JobAdsService } from '../../services/job-ads.service';
import { JobAds } from '../../../../core/domain/entities/job-ads';

@Component({
	selector: 'app-job-ads',
	standalone: true,
	imports: [
		CommonModule,
		OverlayImageContainerComponent,
		SearchFieldComponent,
		CardJobAdsComponent,
		AngularSvgIconModule,
	],
	templateUrl: './job-ads.component.html',
	styleUrls: ['./job-ads.component.scss'],
	providers: [JobAdsService],
})
export class JobAdsComponent implements OnInit {
	overlayImage =
		'https://res.cloudinary.com/damu971dt/image/upload/v1718958396/Projects/alex-kotliarskyi-QBpZGqEMsKg-unsplash_hv7ltq.jpg';

	jobAds!: JobAds[];

	constructor(
		private readonly router: Router,
		private readonly destroyRef: DestroyRef,
		private readonly jobAdsService: JobAdsService,
	) {}

	ngOnInit(): void {
		this.findAll();
	}

	findAll(): void {
		this.jobAdsService
			.findAll()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (response: JobAds[]) => {
					this.jobAds = response;
				},
				error: (error: HttpErrorResponse) => {
					console.error(error);
				},
			});
	}

	onDetails(id: string): void {
		this.router.navigateByUrl(`/jobs/details/${id}`);
	}

	onBookmark(): void {
		console.log('onBookmark');
	}
}
