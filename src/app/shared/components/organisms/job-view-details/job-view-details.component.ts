import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, Input, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DialogModule } from 'primeng/dialog';
import { take, timer } from 'rxjs';
import { SavedJobAdsDto } from '../../../../core/domain/dto/saved-job-ads.dto';
import { JobAds } from '../../../../core/domain/entities/job-ads';
import { StorageService } from '../../../../core/services/storage.service';
import { JobAdsService } from '../../../../features/jobs/services/job-ads.service';
import { RupiahPipe } from '../../../pipes/rupiah.pipe';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';
import { ProfilePromptComponent } from '../../molecules/profile-prompt/profile-prompt.component';

@Component({
	selector: 'app-job-view-details',
	standalone: true,
	imports: [
		CommonModule,
		AngularSvgIconModule,
		RouterModule,
		TimeAgoPipe,
		RupiahPipe,
		DialogModule,
		ProfilePromptComponent,
	],
	templateUrl: './job-view-details.component.html',
	styleUrls: ['./job-view-details.component.scss'],
})
export class JobViewDetailsComponent implements OnInit {
	@Input() jobAdsId!: string;
	companyId!: string;
	jobAds!: JobAds;
	visible = false;

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly destroyRef: DestroyRef,
		private readonly jobAdsService: JobAdsService,
		private readonly storageService: StorageService,
	) {
		this.jobAdsId = this.route.snapshot.paramMap.get('id')!;
	}

	ngOnInit(): void {
		this.findById();
	}

	showDialog() {
		this.visible = true;
	}

	navigate(): void {
		this.router.navigate(['/profile']);
	}

	savedJobs(): void {
		const payload: SavedJobAdsDto = {
			seekerId: this.storageService.getSeekerIdentity(),
			jobAdsId: this.jobAds.id,
		};
		this.jobAdsService
			.savedJobAds(payload)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: () => {
					// TODO: toast message should be displayed here (below)
				},
				error: (error: HttpErrorResponse) => {
					console.error(error);
				},
				complete: () => {
					this.navigateAfterSucceed();
				},
			});
	}

	navigateAfterSucceed(): void {
		timer(1000)
			.pipe(take(1))
			.subscribe(() => this.router.navigateByUrl('/activity/saved-jobs'));
	}

	findById(): void {
		this.jobAdsService
			.findById(this.jobAdsId)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (response: JobAds) => {
					this.jobAds = response;
					this.companyId = this.jobAds.employer.company?.id!;
				},
				error: (error: HttpErrorResponse) => {
					console.error(error);
				},
				complete: () => {},
			});
	}

	setCompanyId(id: string): void {
		this.companyId = id;
		this.storageService.setCompanyIdentity(this.companyId);
	}

	viewAllJobs(id: string): void {
		this.setCompanyId(id);
		this.router.navigateByUrl(`/jobs/views`, { state: { id: this.companyId } });
	}
}
