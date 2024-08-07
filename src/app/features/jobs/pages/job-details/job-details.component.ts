import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DialogModule } from 'primeng/dialog';
import { take, timer } from 'rxjs';
import { CreateApplicationDto } from '../../../../core/domain/dto/create-application.dto';
import { SavedJobAdsDto } from '../../../../core/domain/dto/saved-job-ads.dto';
import { JobAds } from '../../../../core/domain/entities/job-ads';
import { StorageService } from '../../../../core/services/storage.service';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { ProfilePromptComponent } from '../../../../shared/components/molecules/profile-prompt/profile-prompt.component';
import { RupiahPipe } from '../../../../shared/pipes/rupiah.pipe';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { ToastService } from '../../../../shared/services/toast.service';
import { JobAdsService } from '../../services/job-ads.service';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
        ButtonComponent,
        DynamicDialogModule,
        ConfirmDialogModule,
    ],
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.scss'],
    providers: [JobAdsService, DialogService, ConfirmationService],
})
export class JobDetailsComponent implements OnInit {
    jobId!: string;
    companyId!: string;
    jobAds!: JobAds;
    visible = false;
    seekerId!: string;

    isLoading = false;
    isSavedJobSubmitted = false;

    ref: DynamicDialogRef | undefined;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly destroyRef: DestroyRef,
        private readonly jobAdsService: JobAdsService,
        private readonly storageService: StorageService,
        private readonly toastService: ToastService,
        public dialogService: DialogService,
        private readonly confirmationService: ConfirmationService,
    ) {
        this.jobId = this.route.snapshot.paramMap.get('id')!;
        this.seekerId = this.storageService.getSeekerIdentity();
    }

    ngOnInit(): void {
        this.findById();
    }

    savedJobs(): void {
        this.isSavedJobSubmitted = true;
        const payload: SavedJobAdsDto = {
            seekerId: this.storageService.getSeekerIdentity(),
            jobAdsId: this.jobAds.id,
        };
        this.jobAdsService
            .savedJobAds(payload)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.toastService.showSuccessToast('Success', 'Saved!');
                    setTimeout(() => {
                        this.isSavedJobSubmitted = false;
                    }, 2000);
                },
                error: (error: HttpErrorResponse) => {
                    this.setLoading();
                    this.toastService.showErrorToast('Error', error.message);
                },
                complete: () => {
                    this.navigateAfterSucceed('saved-jobs');
                },
            });
    }

    onSubmitted(): void {
        if (this.seekerId) {
            this.applyConfirmation();
        } else {
            this.confirmDialog();
        }
    }

    applyConfirmation(): void {
        this.confirmationService.confirm({
            header: 'Apply Confirmation',
            message: 'Are you sure want to apply this job?',
            accept: () => {
                this.onApplied();
            },
        });
    }

    onApplied() {
        const application: CreateApplicationDto = {
            seekerId: this.seekerId,
            jobAdsId: this.jobAds.id,
            status: 'Applied',
        };
        this.jobAdsService
            .appliedJobs(application)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.toastService.showSuccessToast('Success', 'Applied!');
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

    navigateAfterSucceed(route: string): void {
        timer(1000)
            .pipe(take(1))
            .subscribe(() => this.router.navigateByUrl(`/activity/${route}`));
    }

    findById(): void {
        this.jobAdsService
            .findById(this.jobId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (response: JobAds) => {
                    this.jobAds = response;
                    if (this.jobAds.employer?.company) {
                        this.companyId = this.jobAds.employer.company.id;
                    } else {
                        this.toastService.showWarnToast(
                            'Warning',
                            'Company information is not available.',
                        );
                    }
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.showErrorToast('Error', error.message);
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

    confirmDialog(): void {
        this.ref = this.dialogService.open(ProfilePromptComponent, {
            header: 'Complete Your Profile',
            width: '50vw',
            modal: true,
            breakpoints: { '1199px': '75vw', '575px': '90vw' },
        });
    }
}
