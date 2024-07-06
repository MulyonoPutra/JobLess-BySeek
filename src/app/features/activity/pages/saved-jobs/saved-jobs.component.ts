import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { StorageService } from '../../../../core/services/storage.service';
import { CardActivityComponent } from '../../../../shared/components/molecules/card-activity/card-activity.component';
import { ActivityService } from '../../services/activity.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { timer, take } from 'rxjs';
import { SavedJobs } from '../../../../core/domain/entities/saved-jobs';
import { EmptyStateComponent } from '../../../../shared/components/atoms/empty-state/empty-state.component';

@Component({
	selector: 'app-saved-jobs',
	standalone: true,
	imports: [CommonModule, CardActivityComponent, EmptyStateComponent],
	templateUrl: './saved-jobs.component.html',
	styleUrls: ['./saved-jobs.component.scss'],
	providers: [ActivityService],
})
export class SavedJobsComponent implements OnInit {
	isLoading = false;
	jobAds!: SavedJobs[];

	constructor(
		private readonly router: Router,
		private readonly destroyRef: DestroyRef,
		private readonly activityService: ActivityService,
		private readonly storageService: StorageService,
		private readonly toastService: ToastService,
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
				next: (response) => {
					this.jobAds = response;
				},
				error: (error: HttpErrorResponse) => {
					this.errorMessage(error.message);
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

	onRemove(id: string): void {
		this.activityService
			.removeSavedJobsById(id)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: () => {
					this.toastService.showSuccessToast('Success', 'Sucessfully removed');
				},
				error: (error: HttpErrorResponse) => {
					this.errorMessage(error.message);
				},
				complete: () => {
					this.reloadAfterSuccess();
				},
			});
	}

	reloadAfterSuccess(): void {
		timer(2000)
			.pipe(take(1))
			.subscribe(() => window.location.reload());
	}

	errorMessage(message: string) {
		this.toastService.showErrorToast('Error', message);
	}
}
