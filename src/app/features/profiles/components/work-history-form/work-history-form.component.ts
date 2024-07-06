import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges, type OnInit } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { take, timer } from 'rxjs';
import { WorkHistoryDto } from '../../../../core/domain/dto/work-history.dto';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProfileService } from '../../services/profile.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CreateWorkHistoryDto } from '../../../../core/domain/dto/create-work-history.dto';
import { StorageService } from '../../../../core/services/storage.service';
import { FormCalendarFieldComponent } from '../../../../shared/components/atoms/form-calendar-field/form-calendar-field.component';
import { TextAreaFieldComponent } from '../../../../shared/components/atoms/text-area-field/text-area-field.component';

@Component({
	selector: 'app-work-history-form',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AngularSvgIconModule,
		ButtonComponent,
		FormInputFieldComponent,
    FormCalendarFieldComponent,
    TextAreaFieldComponent
	],
	templateUrl: './work-history-form.component.html',
	styleUrls: ['./work-history-form.component.scss'],
})
export class WorkHistoryFormComponent implements OnInit {
	@Input() experienceId!: string;
	label!: string;

	form!: FormGroup;
	updateForm!: FormGroup;

	isLoading = false;
	updateWorkHistoryDto!: WorkHistoryDto;

	constructor(
		private readonly router: Router,
		private readonly fb: FormBuilder,
		private readonly toastService: ToastService,
		private readonly profileService: ProfileService,
		private readonly storageService: StorageService,
		private readonly dialogConfig: DynamicDialogConfig,
	) {
		this.experienceId = this.dialogConfig.data?.id;
	}

	ngOnInit(): void {
		if (!this.experienceId) {
			this.formArrayInitialized();
			this.label = 'Save';
		} else {
			this.updateFormInitializated();
			this.findExperienceById();
			this.label = 'Update';
		}
	}

	findExperienceById() {
		this.profileService.findExperienceById(this.experienceId).subscribe({
			next: (data) => {
				this.form = this.fb.group({
					experience: this.prepopulateForms(data),
				});
			},
			error: (error: HttpErrorResponse) => {
				console.error(error);
			},
			complete: () => {},
		});
	}

	formArrayInitialized(): void {
		this.form = this.fb.group({
			experience: this.fb.array([this.experienceFormGroup()]),
		});
	}

	experienceFormGroup(): FormGroup {
		return this.fb.group({
			startDate: ['', Validators.required],
			endDate: ['', Validators.required],
			location: ['', Validators.required],
			position: ['', Validators.required],
			companyName: ['', Validators.required],
			responsibilities: ['', Validators.required],
			seekerId: [''],
		});
	}

	protected prepopulateForms(data: WorkHistoryDto): void {
		this.updateForm.patchValue({
			startDate: new Date(data.startDate),
			endDate: new Date(data.endDate),
			location: data.location,
			position: data.position,
			companyName: data.companyName,
			responsibilities: data.responsibilities,
		});
	}

	updateFormInitializated(): void {
		this.updateForm = this.fb.group({
			startDate: ['', Validators.required],
			endDate: ['', Validators.required],
			location: ['', Validators.required],
			position: ['', Validators.required],
			companyName: ['', Validators.required],
			responsibilities: ['', Validators.required],
		});
	}

	get formCtrlValue(): CreateWorkHistoryDto {
		return {
			startDate: this.form.get('startDate')?.value,
			endDate: this.form.get('endDate')?.value,
			location: this.form.get('location')?.value,
			position: this.form.get('position')?.value,
			companyName: this.form.get('companyName')?.value,
			responsibilities: this.form.get('responsibilities')?.value,
			seekerId: this.form.get('seekerId')?.value,
		};
	}

	get experienceFormArray(): FormArray {
		return this.form.get('experience')! as FormArray;
	}

	get newFormValue(): CreateWorkHistoryDto[] {
		const seekerId = this.storageService.getSeekerIdentity();
		return (
			this.form.get('experience')?.value.map((experience: CreateWorkHistoryDto) => ({
				startDate: experience.startDate,
				endDate: experience.endDate,
				location: experience.location,
				position: experience.position,
				companyName: experience.companyName,
				responsibilities: experience.responsibilities,
				seekerId: seekerId,
			})) || []
		);
	}

	get updatedFormValue(): WorkHistoryDto {
		return this.updateForm.value;
	}

	get experienceFormGroupValue(): WorkHistoryDto {
		return this.form.value.experience.find((exp: WorkHistoryDto) => exp);
	}

	experienceFormGroupIndex(index: number): FormGroup {
		const experiences = this.form.get('experience') as FormArray;
		return experiences.at(index) as FormGroup;
	}

	addNewForms(): void {
		const formArray = this.form.get('experience') as FormArray;
		formArray.push(this.experienceFormGroup());
	}

	removeForms(i: number): void {
		const formArray = this.form.get('experience') as FormArray;
		formArray.removeAt(i);
	}

	onSubmit(): void {
		this.isLoading = true;
		if (this.experienceId) {
			this.onUpdate();
		} else {
			this.onCreate();
		}
	}

	onUpdate(): void {
		if (this.updateForm.valid) {
			this.profileService
				.updateWorkHistory(this.experienceId, this.updatedFormValue)
				.subscribe({
					next: () => {
            this.toastService.showSuccessToast('Success', 'Updated Work History...');
						setTimeout(() => {
							this.isLoading = false;
						}, 2000);
					},
					error: (error: HttpErrorResponse) => {
						this.isLoading = false;
						this.toastService.showErrorToast('Error', error.message);
					},
					complete: () => {
						this.navigateAfterSucceed();
					},
				});
		}
	}

	onCreate(): void {
		if (this.form.valid) {
			this.profileService.createWorkHistory(this.newFormValue).subscribe({
				next: () => {
          this.toastService.showSuccessToast('Success', 'Created Work History...');
					setTimeout(() => {
						this.isLoading = false;
					}, 2000);
				},
				error: (error: HttpErrorResponse) => {
					this.isLoading = false;
					this.toastService.showErrorToast('Error', error.message);
				},
				complete: () => {
					this.navigateAfterSucceed();
				},
			});
		}
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
}
