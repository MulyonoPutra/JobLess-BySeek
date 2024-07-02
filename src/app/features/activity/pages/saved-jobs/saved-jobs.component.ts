import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { StorageService } from '../../../../core/services/storage.service';
import { CardActivityComponent } from '../../../../shared/components/molecules/card-activity/card-activity.component';
import { ActivityService } from '../../services/activity.service';
import { JobAds } from '../../../../core/domain/entities/job-ads';

@Component({
	selector: 'app-saved-jobs',
	standalone: true,
	imports: [CommonModule, CardActivityComponent],
	templateUrl: './saved-jobs.component.html',
	styleUrls: ['./saved-jobs.component.scss'],
	providers: [ActivityService],
})
export class SavedJobsComponent implements OnInit {
	isLoading = false;
	jobAds!: JobAds[];

	constructor(
		private readonly router: Router,
		private readonly destroyRef: DestroyRef,
		private readonly activityService: ActivityService,
		private readonly storageService: StorageService,
	) {}

	ngOnInit(): void {
		this.findOne();
	}

	findOne(): void {
		const seekerId = this.storageService.getSeekerIdentity();
		this.activityService
			.findSavedJobsBySeekerId(seekerId)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (response: JobAds[]) => {
					this.jobAds = response;
				},
				error: (error: HttpErrorResponse) => {
					console.error(error);
				},
				complete: () => {},
			});
	}

	applied(): void {
		setTimeout(() => {
			this.isLoading = false;
		}, 3000);
		this.isLoading = true;
	}

	onRemove(): void {
		console.log('removed');
	}
}
