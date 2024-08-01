import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, DestroyRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { take, timer } from 'rxjs';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { CreateApplicationDto } from '../../../../core/domain/dto/create-application.dto';
import { DialogModule } from 'primeng/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { JobAds } from '../../../../core/domain/entities/job-ads';
import { JobAdsService } from '../../../../features/jobs/services/job-ads.service';
import { ProfilePromptComponent } from '../../molecules/profile-prompt/profile-prompt.component';
import { RupiahPipe } from '../../../pipes/rupiah.pipe';
import { SavedJobAdsDto } from '../../../../core/domain/dto/saved-job-ads.dto';
import { StorageService } from '../../../../core/services/storage.service';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';
import { ToastService } from '../../../services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
        DynamicDialogModule,
        ConfirmDialogModule,
        ButtonComponent,
    ],
    templateUrl: './job-view-details.component.html',
    styleUrls: ['./job-view-details.component.scss'],
    providers: [JobAdsService, DialogService, ConfirmationService],
})
export class JobViewDetailsComponent implements OnChanges {
    @Input() jobAdsId!: string;
    companyId!: string;
    jobAds!: JobAds;
    visible = false;
    isLoading = false;
    seekerId!: string;

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
        this.jobAdsId = this.route.snapshot.paramMap.get('id')!;
        this.seekerId = this.storageService.getSeekerIdentity();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['jobAdsId']) {
            this.findById();
        }
    }

    showDialog() {
        this.visible = true;
    }

    navigate(): void {
        this.router.navigate(['/profile']);
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
                    this.setLoading();
                    this.toastService.showSuccessToast('Success', 'Applied!');
                },
                error: (error: HttpErrorResponse) => {
                    this.setLoading();
                    this.toastService.showErrorToast('Error', error.message);
                },
                complete: () => {
                    this.navigateAfterSucceed();
                },
            });
    }

    private setLoading() {
        setTimeout(() => {
            this.isLoading = false;
        }, 2000);
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
                    this.toastService.showSuccessToast('Success', 'Applied Successfully!');
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.showErrorToast('Error', error.message);
                },
                complete: () => {
                    this.navigateAfterSucceed();
                },
            });
    }

    navigateAfterSucceed(): void {
        timer(1000)
            .pipe(take(1))
            .subscribe(() => this.router.navigateByUrl('/activity/applied-jobs'));
    }

    findById(): void {
        this.isLoading = true;
        this.jobAdsService
            .findById(this.jobAdsId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (response: JobAds) => {
                    this.jobAds = response;
                    if (this.jobAds.employer?.company?.id) {
                        this.companyId = this.jobAds.employer.company.id;
                    } else {
                        this.toastService.showWarnToast(
                            'Warning',
                            'Company ID is not found, Please back to previous page!',
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
