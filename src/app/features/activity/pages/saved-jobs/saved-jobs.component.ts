import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { take, timer } from 'rxjs';
import { CreateApplicationDto } from '../../../../core/domain/dto/create-application.dto';
import { SavedJobs } from '../../../../core/domain/entities/saved-jobs';
import { StorageService } from '../../../../core/services/storage.service';
import { EmptyStateComponent } from '../../../../shared/components/atoms/empty-state/empty-state.component';
import { CardActivityComponent } from '../../../../shared/components/molecules/card-activity/card-activity.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { JobAdsService } from '../../../jobs/services/job-ads.service';
import { ActivityService } from '../../services/activity.service';

@Component({
    selector: 'app-saved-jobs',
    standalone: true,
    imports: [
        CommonModule,
        CardActivityComponent,
        EmptyStateComponent,
        DynamicDialogModule,
        ConfirmDialogModule,
        DialogModule,
    ],
    templateUrl: './saved-jobs.component.html',
    styleUrls: ['./saved-jobs.component.scss'],
    providers: [ActivityService, JobAdsService, DialogService, ConfirmationService],
})
export class SavedJobsComponent implements OnInit {
    isLoading = false;
    jobAds!: SavedJobs[];
    seekerId!: string;

    constructor(
        private readonly router: Router,
        private readonly destroyRef: DestroyRef,
        private readonly activityService: ActivityService,
        private readonly storageService: StorageService,
        private readonly toastService: ToastService,
        public dialogService: DialogService,
        private readonly jobAdsService: JobAdsService,
        private readonly confirmationService: ConfirmationService,
    ) {
        this.seekerId = this.storageService.getSeekerIdentity();
    }

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
                    this.toastService.showErrorToast('Error', error.message);
                },
                complete: () => {},
            });
    }

    applyConfirmation(savedJobs: SavedJobs): void {
        const jobAdsId = savedJobs.jobAds.id;
        this.confirmationService.confirm({
            header: 'Apply Confirmation',
            message: 'Are you sure want to apply this job?',
            accept: () => {
                this.onApplied(jobAdsId);
            },
        });
    }

    onApplied(jobAdsId: string): void {
        this.isLoading = true;
        const application: CreateApplicationDto = {
            seekerId: this.seekerId,
            jobAdsId: jobAdsId,
            status: 'Applied',
        };
        this.jobAdsService
            .appliedJobs(application)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.toastService.showSuccessToast('Success', 'Applied!');
                },
                error: (error: HttpErrorResponse) => {
                    this.setLoading();
                    this.toastService.showErrorToast('Error', error.message);
                },
                complete: () => {
                    this.navigateAfterSucceed('applied-jobs');
                },
            });
    }

    private setLoading() {
        setTimeout(() => {
            this.isLoading = false;
        }, 2000);
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
                    this.toastService.showErrorToast('Error', error.message);
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

    navigateAfterSucceed(route: string): void {
        timer(1000)
            .pipe(take(1))
            .subscribe(() =>
                this.router.navigateByUrl(`/activity/${route}`).then(() => {
                    window.location.reload();
                }),
            );
    }
}
