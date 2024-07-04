import { CommonModule } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CardProfileComponent } from '../../../../shared/components/molecules/card-profile/card-profile.component';
import { SectionHeaderProfileComponent } from '../../../../shared/components/molecules/section-header-profile/section-header-profile.component';
import { OverlayImageContainerComponent } from '../../../../shared/components/molecules/overlay-image-container/overlay-image-container.component';
import { CardSummaryComponent } from '../../../../shared/components/molecules/card-summary/card-summary.component';
import { Router } from '@angular/router';
import { BadgeComponent } from '../../../../shared/components/atoms/badge/badge.component';
import { ProfileService } from '../../services/profile.service';
import { StorageService } from '../../../../core/services/storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Seeker } from '../../../../core/domain/entities/seeker';
import { HttpErrorResponse } from '@angular/common/http';
import { OVERLAY_IMAGES } from '../../../../core/constants/overlay-images';
import { User } from '../../../../core/domain/entities/user';
import { MonthYearPipe } from '../../../../shared/pipes/month-year.pipe';
import { DialogComponent } from '../../../../shared/components/molecules/dialog/dialog.component';
import { SummaryFormComponent } from '../../components/summary-form/summary-form.component';
import { UpdateSummaryDto } from '../../../../core/domain/dto/update-summary.dto';

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
    SummaryFormComponent
	],
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
	providers: [ProfileService, MonthYearPipe],
})
export class ProfileComponent implements OnInit {
	seeker!: Seeker;
	user!: User;
  updateSummaryDto!: UpdateSummaryDto;

  isVisible!: boolean;

	overlayImage = OVERLAY_IMAGES.profile;

	constructor(
		private readonly router: Router,
		private readonly destroyRef: DestroyRef,
		private readonly profileService: ProfileService,
		private readonly storageService: StorageService,
		private readonly monthYearPipe: MonthYearPipe,
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
				complete: () => {},
			});
	}

	duration(startDate: string, endDate: string): string {
		return `${this.monthYearPipe.transform(startDate)} - ${this.monthYearPipe.transform(endDate)}`;
	}

	onEdit(id: string): void {
		console.log(id);
	}

	onUpdateSummary(): void {
		// this.router.navigateByUrl(`/profile/forms/${id}`);
    this.isVisible = true;
	}

	onCreateSummary(): void {
		// this.router.navigate(['/profile/summary']);
    this.isVisible = true;
	}

  onHide() {
    this.isVisible = !this.isVisible;
  }

	onCreateExperience(): void {
		console.log('create new experience');
	}

	onCreateEducation(): void {}
}
