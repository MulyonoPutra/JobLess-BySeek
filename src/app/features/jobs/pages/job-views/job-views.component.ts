import { CommonModule } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { CardJobAdsComponent } from '../../../../shared/components/molecules/card-job-ads/card-job-ads.component';
import { Router } from '@angular/router';
import { CompanyService } from '../../../companies/services/company.service';
import { JobAds } from '../../../../core/domain/entities/job-ads';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../../../core/services/storage.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { RupiahPipe } from '../../../../shared/pipes/rupiah.pipe';
import { JobViewDetailsComponent } from '../../../../shared/components/organisms/job-view-details/job-view-details.component';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
	selector: 'app-job-views',
	standalone: true,
	imports: [
		CommonModule,
		AngularSvgIconModule,
		CardJobAdsComponent,
		TimeAgoPipe,
		RupiahPipe,
		JobViewDetailsComponent,
	],
	templateUrl: './job-views.component.html',
	styleUrls: ['./job-views.component.scss'],
  providers: [CompanyService],
})
export class JobViewsComponent implements OnInit {
	jobAds!: JobAds[];
	jobAdsId!: string;
	companyId!: string;
	routerState!: string;

	content = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. `;

	constructor(
		private readonly router: Router,
		private readonly destroyRef: DestroyRef,
		private readonly companyService: CompanyService,
		private readonly storageService: StorageService,
		private readonly toastService: ToastService,
	) {
		this.routerState = this.router.getCurrentNavigation()?.extras.state?.['id'];
	}

	ngOnInit(): void {
		this.companyId = this.routerState || this.storageService.getCompanyIdentity();
		if (this.companyId) {
			this.findJobAdsByCompanyId();
		} else {
			this.toastService.showWarnToast(
				'Warning',
				'Company ID is not found, Please back to previous page!',
			);
		}
	}


	onDetails(id: string): void {
		this.jobAdsId = id;
	}

	onBookmark(): void {
		console.log('onBookmark');
	}

	findJobAdsByCompanyId() {
		this.companyService
			.findJobAdsByCompanyId(this.companyId)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (jobAds: JobAds[]) => {
					this.jobAds = jobAds;
				},
				error: (error: HttpErrorResponse) => {
					this.toastService.showErrorToast('Error', error.message);
				},
			});
	}
}
