import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	FormsModule,
	ReactiveFormsModule,
	Validators,
	FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { WorkHistoryDto } from '../../../../core/domain/dto/work-history.dto';
import { StorageService } from '../../../../core/services/storage.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProfileService } from '../../services/profile.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { FormCalendarFieldComponent } from '../../../../shared/components/atoms/form-calendar-field/form-calendar-field.component';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { TextAreaFieldComponent } from '../../../../shared/components/atoms/text-area-field/text-area-field.component';
import { HttpErrorResponse } from '@angular/common/http';
import { EducationDto } from '../../../../core/domain/dto/create-education.dto';
import { take, timer } from 'rxjs';
import { NumberFieldComponent } from '../../../../shared/components/atoms/number-field/number-field.component';

@Component({
	selector: 'app-education-form',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AngularSvgIconModule,
		ButtonComponent,
		FormInputFieldComponent,
		FormCalendarFieldComponent,
		TextAreaFieldComponent,
		NumberFieldComponent,
	],
	templateUrl: './education-form.component.html',
	styleUrls: ['./education-form.component.scss'],
})
export class EducationFormComponent implements OnInit {
	educationId!: string;
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
		this.educationId = this.dialogConfig.data?.id;
	}

	ngOnInit(): void {
		if (!this.educationId) {
			this.formArrayInitialized();
			this.label = 'Save';
		} else {
			this.updateFormInitializated();
			this.findEducationById();
			this.label = 'Update';
		}
	}

	findEducationById() {
		this.profileService.findEducationById(this.educationId).subscribe({
			next: (data) => {
				this.form = this.fb.group({
					education: this.prepopulateForms(data),
				});
			},
			error: (error: HttpErrorResponse) => {
				this.toastService.showErrorToast('Error', error.message);
			},
			complete: () => {},
		});
	}

	formArrayInitialized(): void {
		this.form = this.fb.group({
			education: this.fb.array([this.educationFormGroup()]),
		});
	}

	educationFormGroup(): FormGroup {
		return this.fb.group({
			startDate: ['', Validators.required],
			endDate: ['', Validators.required],
			title: ['', Validators.required],
			institution: ['', Validators.required],
			GPA: [null, Validators.required],
			description: ['', Validators.required],
			seekerId: [''],
		});
	}

	protected prepopulateForms(data: EducationDto): void {
		this.updateForm.patchValue({
			startDate: new Date(data.startDate),
			endDate: new Date(data.endDate),
			title: data.title,
			institution: data.institution,
			GPA: data.GPA,
			description: data.description,
		});
	}

	updateFormInitializated(): void {
		this.updateForm = this.fb.group({
			startDate: ['', Validators.required],
			endDate: ['', Validators.required],
			title: ['', Validators.required],
			institution: ['', Validators.required],
			GPA: ['', Validators.required],
			description: ['', Validators.required],
		});
	}

	get formCtrlValue(): EducationDto {
		return {
			startDate: this.form.get('startDate')?.value,
			endDate: this.form.get('endDate')?.value,
			title: this.form.get('title')?.value,
			institution: this.form.get('institution')?.value,
			GPA: parseFloat(this.form.get('GPA')?.value),
			description: this.form.get('description')?.value,
			seekerId: this.form.get('seekerId')?.value,
		};
	}

	get educationFormArray(): FormArray {
		return this.form.get('education')! as FormArray;
	}

	get newFormValue(): EducationDto[] {
		const seekerId = this.storageService.getSeekerIdentity();
		return (
			this.form.get('education')?.value.map((education: EducationDto) => ({
				startDate: education.startDate,
				endDate: education.endDate,
				title: education.title,
				institution: education.institution,
				GPA: typeof education.GPA === 'string' ? parseFloat(education.GPA) : education.GPA,
				description: education.description,
				seekerId: seekerId,
			})) || []
		);
	}

	get updatedFormValue(): EducationDto {
		return {
			...this.updateForm.value,
			GPA: parseFloat(this.updateForm.get('GPA')?.value),
		};
	}

	get educationFormGroupValue(): EducationDto {
		return this.form.value.education.find((exp: EducationDto) => exp);
	}

	educationFormGroupIndex(index: number): FormGroup {
		const educations = this.form.get('education') as FormArray;
		return educations.at(index) as FormGroup;
	}

	addNewForms(): void {
		const formArray = this.form.get('education') as FormArray;
		formArray.push(this.educationFormGroup());
	}

	removeForms(i: number): void {
		const formArray = this.form.get('education') as FormArray;
		formArray.removeAt(i);
	}

	onSubmit(): void {
		this.isLoading = true;
		if (this.educationId) {
			this.onUpdate();
		} else {
			this.onCreate();
		}
	}

	onUpdate(): void {
		if (this.updateForm.valid) {
			this.profileService.updateEducation(this.educationId, this.updatedFormValue).subscribe({
				next: () => {
					this.toastService.showSuccessToast('Success', 'Updated Education...');
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
			this.profileService.createEducation(this.newFormValue).subscribe({
				next: () => {
					this.toastService.showSuccessToast('Success', 'Created Education...');
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
