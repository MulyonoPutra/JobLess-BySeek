import { CommonModule } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { take, timer } from 'rxjs';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { FormPasswordFieldComponent } from '../../../../shared/components/atoms/form-password-field/form-password-field.component';
import { GoogleButtonComponent } from '../../../../shared/components/atoms/google-button/google-button.component';
import { OrDividerComponent } from '../../../../shared/components/atoms/or-divider/or-divider.component';
import { ClientListComponent } from '../../../../shared/components/molecules/client-list/client-list.component';
import { ValidationService } from '../../../../shared/services/validation.service';
import { AuthenticationService } from '../../services/authentication.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from '../../../../shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		CommonModule,
		AngularSvgIconModule,
		FormsModule,
		RouterModule,
		ReactiveFormsModule,
		GoogleButtonComponent,
		OrDividerComponent,
		ButtonComponent,
		FormInputFieldComponent,
		FormPasswordFieldComponent,
		ClientListComponent,
	],
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	form!: FormGroup;
	isLoading: boolean = false;

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly router: Router,
		private readonly destroyRef: DestroyRef,
		private readonly validationService: ValidationService,
		private readonly authenticationService: AuthenticationService,
		private readonly toastService: ToastService,
	) {}

	ngOnInit(): void {
		this.formInit();
	}

	formInit(): void {
		this.form = this.formBuilder.group(
			{
				name: ['', Validators.required],
				email: ['', [Validators.required, Validators.email]],
				termsAndCondition: [false, Validators.required],
				password: [
					'',
					[Validators.required, this.validationService.combinedPasswordValidator()],
				],
				confirmPassword: ['', Validators.required],
			},
			{ validators: this.validationService.passwordMatchValidator },
		);
	}

	get f() {
		return this.form.controls;
	}

	get formCtrlValue() {
		return {
			name: this.form.get('name')?.value,
			email: this.form.get('email')?.value,
			password: this.form.get('password')?.value,
		};
	}

	private setLoading() {
		setTimeout(() => {
			this.isLoading = false;
		}, 2000);
	}

	register(): void {
		this.authenticationService
			.register(this.formCtrlValue)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: () => {
					this.toastService.showSuccessToast('Success', 'Register Successfully!');
					this.setLoading();
				},
				error: (error: HttpErrorResponse) => {
					this.setLoading();
					this.toastService.showErrorToast('Error', error.message);
				},
				complete: () => {
					this.form.reset();
					this.navigateAfterSucceed();
				},
			});
	}

	navigateAfterSucceed(): void {
		timer(1000)
			.pipe(take(1))
			.subscribe(() => this.router.navigateByUrl('/auth/login'));
	}

	onSubmit() {
		this.isLoading = true;
		if (this.form.valid) {
			this.register();
		}
	}
}
