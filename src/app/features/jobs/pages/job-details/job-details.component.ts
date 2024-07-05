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
    ButtonComponent
  ],
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  providers: [JobAdsService],
})
export class JobDetailsComponent implements OnInit {
  jobId!: string;
  companyId!: string;
  jobAds!: JobAds;
  visible = false;

  isLoading = false;
  isSavedJobSubmitted = false;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly destroyRef: DestroyRef,
    private readonly jobAdsService: JobAdsService,
    private readonly storageService: StorageService,
    private readonly toastService: ToastService,
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
          this.successMessage('Successfully saved!')
          setTimeout(() => {
            this.isSavedJobSubmitted = false;
          }, 2000);
        },
        error: (error: HttpErrorResponse) => {
          this.setLoading();
          this.errorMessage(error.message);
        },
        complete: () => {
          this.navigateAfterSucceed('saved-jobs');
        },
      });
  }

  applied() {
    const seekerId = this.storageService.getSeekerIdentity();
    const application: CreateApplicationDto = {
      seekerId: seekerId,
      jobAdsId: this.jobAds.id,
      status: 'Applied'
    }
    this.jobAdsService.appliedJobs(application)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.successMessage('Applied!')
        },
        error: (error: HttpErrorResponse) => {
          this.setLoading();
          this.errorMessage(error.message);
        },
        complete: () => {
          this.navigateAfterSucceed('applied-jobs');
        },
      })
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
          this.companyId = this.jobAds.employer.company?.id!;
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage(error.message);
        },
        complete: () => { },
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

  successMessage(message: string): void {
    this.toastService.showSuccessToast('Success', message);
  }

  errorMessage(message: string) {
    this.toastService.showErrorToast('Error', message);
  }
}
