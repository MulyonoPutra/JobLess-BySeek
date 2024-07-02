import { CommonModule } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { JobAdsService } from '../../services/job-ads.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { RupiahPipe } from '../../../../shared/pipes/rupiah.pipe';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { JobAds } from '../../../../core/domain/entities/job-ads';
import { DialogModule } from 'primeng/dialog';
import { ProfilePromptComponent } from '../../../../shared/components/molecules/profile-prompt/profile-prompt.component';
import { StorageService } from '../../../../core/services/storage.service';
import { SavedJobAdsDto } from '../../../../core/domain/dto/saved-job-ads.dto';
import { timer, take } from 'rxjs';

@Component({
	selector: 'app-job-details',
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
	templateUrl: './job-details.component.html',
	styleUrls: ['./job-details.component.scss'],
	providers: [JobAdsService],
})
export class JobDetailsComponent implements OnInit {
	jobId!: string;
	jobAds!: JobAds;
	visible = false;

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly destroyRef: DestroyRef,
		private readonly jobAdsService: JobAdsService,
		private readonly storageService: StorageService,
	) {
		this.jobId = this.route.snapshot.paramMap.get('id')!;
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
			.findById(this.jobId)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (response: JobAds) => {
					this.jobAds = response;
				},
				error: (error: HttpErrorResponse) => {
					console.error(error);
				},
				complete: () => {},
			});
	}
}
