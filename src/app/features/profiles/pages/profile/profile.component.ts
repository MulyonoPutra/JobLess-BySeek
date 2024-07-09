import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { take, timer } from 'rxjs';
import { OVERLAY_IMAGES } from '../../../../core/constants/overlay-images';
import { UpdateSummaryDto } from '../../../../core/domain/dto/update-summary.dto';
import { WorkHistoryDto } from '../../../../core/domain/dto/work-history.dto';
import { Seeker } from '../../../../core/domain/entities/seeker';
import { Skill } from '../../../../core/domain/entities/skill';
import { User } from '../../../../core/domain/entities/user';
import { StorageService } from '../../../../core/services/storage.service';
import { BadgeComponent } from '../../../../shared/components/atoms/badge/badge.component';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { EmptyStateComponent } from '../../../../shared/components/atoms/empty-state/empty-state.component';
import { CardProfileComponent } from '../../../../shared/components/molecules/card-profile/card-profile.component';
import { CardSkillsComponent } from '../../../../shared/components/molecules/card-skills/card-skills.component';
import { CardSummaryComponent } from '../../../../shared/components/molecules/card-summary/card-summary.component';
import { DialogComponent } from '../../../../shared/components/molecules/dialog/dialog.component';
import { OverlayImageContainerComponent } from '../../../../shared/components/molecules/overlay-image-container/overlay-image-container.component';
import { SectionHeaderProfileComponent } from '../../../../shared/components/molecules/section-header-profile/section-header-profile.component';
import { MonthYearPipe } from '../../../../shared/pipes/month-year.pipe';
import { ToastService } from '../../../../shared/services/toast.service';
import { PersonalDetailFormComponent } from '../../components/personal-detail-form/personal-detail-form.component';
import { SkillsFormComponent } from '../../components/skills-form/skills-form.component';
import { SummaryFormComponent } from '../../components/summary-form/summary-form.component';
import { WorkHistoryFormComponent } from '../../components/work-history-form/work-history-form.component';
import { ProfileService } from '../../services/profile.service';
import { EducationFormComponent } from '../../components/education-form/education-form.component';

type DialogConfig = {
	header: string;
	width: string;
	modal: boolean;
	breakpoints: {
		'960px': string;
		'640px': string;
	};
	data?: { id: string } | any;
};

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [
		CommonModule,
		AngularSvgIconModule,
		DynamicDialogModule,
		ConfirmDialogModule,
		CardProfileComponent,
		SectionHeaderProfileComponent,
		OverlayImageContainerComponent,
		CardSummaryComponent,
		BadgeComponent,
		DialogComponent,
		SummaryFormComponent,
		WorkHistoryFormComponent,
		EmptyStateComponent,
		ButtonComponent,
		CardSkillsComponent,
		SkillsFormComponent,
	],
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
	providers: [ProfileService, MonthYearPipe, DialogService, ConfirmationService],
})
export class ProfileComponent implements OnInit {
	seeker!: Seeker;
	user!: User;
	skills!: Skill[];
	seekerId!: string;

	updateSummaryDto!: UpdateSummaryDto;
	updateWorkHistoryDto!: WorkHistoryDto;

	overlayImage = OVERLAY_IMAGES.profile;

	ref: DynamicDialogRef | undefined;

	constructor(
		private readonly router: Router,
		private readonly destroyRef: DestroyRef,
		private readonly profileService: ProfileService,
		private readonly storageService: StorageService,
		private readonly monthYearPipe: MonthYearPipe,
		private readonly toastService: ToastService,
		public dialogService: DialogService,
		private readonly confirmationService: ConfirmationService,
	) {
		this.seekerId = this.storageService.getSeekerIdentity();
	}

	ngOnInit(): void {
		this.findOne();
		this.findSkillsBySeekerId();
	}

	findOne(): void {
		this.profileService
			.findOne(this.seekerId)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (seeker: Seeker) => {
					this.seeker = seeker;
					this.user = this.seeker?.user;
					this.updateSummaryDto = {
						id: this.seeker.id,
						summary: this.seeker?.summary,
					};
				},
				error: (error: HttpErrorResponse) => {
					this.toastService.showErrorToast('Error', error.message);
				},
				complete: () => {},
			});
	}

	findSkillsBySeekerId() {
		this.profileService
			.findSkillsBySeekerId(this.seekerId)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (skills: Skill[]) => {
					this.skills = skills;
				},
				error: (error: HttpErrorResponse) => {
					this.toastService.showErrorToast('Error', error.message);
				},
				complete: () => {},
			});
	}

	duration(startDate: string, endDate: string): string {
		return `${this.monthYearPipe.transform(startDate)} - ${this.monthYearPipe.transform(endDate)}`;
	}

	onRemoveExperience(id: string): void {
		this.profileService.removeExperienceById(id).subscribe({
			next: () => {
				this.toastService.showSuccessToast('Success', 'Removed Work History...');
			},
			error: (error: HttpErrorResponse) => {
				this.toastService.showErrorToast('Error', error.message);
			},
			complete: () => {
				this.navigateAfterSucceed();
			},
		});
	}

	onRemoveEducation(id: string): void {
		this.profileService.removeEducationById(id).subscribe({
			next: () => {
				this.toastService.showSuccessToast('Success', 'Removed Work History...');
			},
			error: (error: HttpErrorResponse) => {
				this.toastService.showErrorToast('Error', error.message);
			},
			complete: () => {
				this.navigateAfterSucceed();
			},
		});
	}

	removeConfirmation(id: string): void {
		this.confirmationService.confirm({
			header: 'Remove Work History',
			message: 'Are you sure want to remove this work history?',
			accept: () => {
				this.onRemoveExperience(id);
			},
		});
	}

	removeEducationConfirm(id: string): void {
		this.confirmationService.confirm({
			header: 'Remove Educaton',
			message: 'Are you sure want to remove this educaton?',
			accept: () => {
				this.onRemoveEducation(id);
			},
		});
	}

	openWorkHistoryDialog(id?: string): void {
		const config: DialogConfig = {
			header: id ? 'Update Work History' : 'Add Work History',
			width: '50vw',
			modal: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
		};

		if (id) {
			config.data = { id };
		}

		this.ref = this.dialogService.open(WorkHistoryFormComponent, config);
	}

	openSummaryDialog(seeker?: Seeker): void {
		this.ref = this.dialogService.open(SummaryFormComponent, {
			header: seeker?.id ? 'Update Summary' : 'Add Summary',
			width: '50vw',
			modal: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
			data: {
				id: seeker?.id,
				summary: seeker?.summary,
			},
		});
	}

	openProfileDialog(user?: User): void {
		this.ref = this.dialogService.open(PersonalDetailFormComponent, {
			header: user?.id ? 'Update Personal Details' : 'Add Personal Details',
			width: '50vw',
			modal: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
			data: {
				user: user,
			},
		});
	}

	openSkillsDialog(skills?: Skill[]): void {
		this.ref = this.dialogService.open(SkillsFormComponent, {
			width: '50vw',
			modal: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
			data: {
				skills: skills,
			},
		});
	}

	openEducationDialog(id?: string): void {
		const config: DialogConfig = {
			header: id ? 'Update Education' : 'Add Education',
			width: '50vw',
			modal: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
		};

		if (id) {
			config.data = { id };
		}

		this.ref = this.dialogService.open(EducationFormComponent, config);
	}

	navigateAfterSucceed(): void {
		timer(3000)
			.pipe(take(1))
			.subscribe(() => {
				this.router.navigateByUrl('/profile').then(() => {
					window.location.reload();
				});
			});
	}

	errorMessage(message: string) {
		this.toastService.showErrorToast('Info', message);
	}
}
