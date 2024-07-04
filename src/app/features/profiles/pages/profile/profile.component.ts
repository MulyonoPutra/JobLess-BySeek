import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, DestroyRef, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { OVERLAY_IMAGES } from '../../../../core/constants/overlay-images';
import { UpdateSummaryDto } from '../../../../core/domain/dto/update-summary.dto';
import { Seeker } from '../../../../core/domain/entities/seeker';
import { User } from '../../../../core/domain/entities/user';
import { StorageService } from '../../../../core/services/storage.service';
import { BadgeComponent } from '../../../../shared/components/atoms/badge/badge.component';
import { CardProfileComponent } from '../../../../shared/components/molecules/card-profile/card-profile.component';
import { CardSummaryComponent } from '../../../../shared/components/molecules/card-summary/card-summary.component';
import { DialogComponent } from '../../../../shared/components/molecules/dialog/dialog.component';
import { OverlayImageContainerComponent } from '../../../../shared/components/molecules/overlay-image-container/overlay-image-container.component';
import { SectionHeaderProfileComponent } from '../../../../shared/components/molecules/section-header-profile/section-header-profile.component';
import { MonthYearPipe } from '../../../../shared/pipes/month-year.pipe';
import { SummaryFormComponent } from '../../components/summary-form/summary-form.component';
import { WorkHistoryFormComponent } from '../../components/work-history-form/work-history-form.component';
import { ProfileService } from '../../services/profile.service';
import { WorkHistoryDto } from '../../../../core/domain/dto/work-history.dto';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    CardProfileComponent,
    SectionHeaderProfileComponent,
    OverlayImageContainerComponent,
    CardSummaryComponent,
    BadgeComponent,
    DialogComponent,
    SummaryFormComponent,
    WorkHistoryFormComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService, MonthYearPipe],
})
export class ProfileComponent implements OnInit {
  seeker!: Seeker;
  user!: User;

  updateSummaryDto!: UpdateSummaryDto;
  updateWorkHistoryDto!: WorkHistoryDto;

  isVisible!: boolean;
  isExperienceVisible!: boolean;

  overlayImage = OVERLAY_IMAGES.profile;

  constructor(
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    private readonly profileService: ProfileService,
    private readonly storageService: StorageService,
    private readonly monthYearPipe: MonthYearPipe,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.findOne();
  }

  findOne(): void {
    const seekerId = this.storageService.getSeekerIdentity();
    this.profileService
      .findOne(seekerId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (seeker: Seeker) => {
          this.seeker = seeker;
          this.user = this.seeker?.user;
          this.updateSummaryDto = {
            id: this.seeker.id,
            summary: this.seeker?.summary
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
        complete: () => { },
      });
  }

  duration(startDate: string, endDate: string): string {
    return `${this.monthYearPipe.transform(startDate)} - ${this.monthYearPipe.transform(endDate)}`;
  }

  onEdit(id: string): void {
    console.log(id);
  }


  onUpdateExperience(experienceId: string): void {

    this.profileService
      .findExperienceById(experienceId)
      .subscribe({
        next: (response) => {
          this.updateWorkHistoryDto = response;
          this.isExperienceVisible = true;
          this.cdr.detectChanges();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
        complete: () => { },
      });
  }

  onUpdateSummary(): void {
    this.isVisible = true;
  }

  onCreateSummary(): void {
    this.isVisible = true;
  }

  onHide() {
    this.isVisible = !this.isVisible;
  }

  onHideWorkHistory(): void {
    this.isExperienceVisible = !this.isExperienceVisible
  }

  onCreateExperience(): void {
    console.log('create new experience');
  }

  onCreateEducation(): void { }
}
