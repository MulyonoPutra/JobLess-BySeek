import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, type OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { take, timer } from 'rxjs';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { FormPasswordFieldComponent } from '../../../../shared/components/atoms/form-password-field/form-password-field.component';
import { GoogleButtonComponent } from '../../../../shared/components/atoms/google-button/google-button.component';
import { OrDividerComponent } from '../../../../shared/components/atoms/or-divider/or-divider.component';
import { ValidationService } from '../../../../shared/services/validation.service';
import { AuthenticationService } from '../../services/authentication.service';
import { OVERLAY_IMAGES } from '../../../../core/constants/overlay-images';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		NgOptimizedImage,
		GoogleButtonComponent,
		OrDividerComponent,
		ButtonComponent,
		FormInputFieldComponent,
		FormPasswordFieldComponent,
	],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	providers: [AuthenticationService, ValidationService],
})
export class LoginComponent implements OnInit {
	bgImage = OVERLAY_IMAGES.login;

	form!: FormGroup;
	isLoading: boolean = false;

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly router: Router,
		private readonly authService: AuthenticationService,
		private readonly validationService: ValidationService,
		private readonly toastService: ToastService,
	) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
		});
	}

	get formCtrlValue() {
		return {
			email: this.form.get('email')?.value,
			password: this.form.get('password')?.value,
		};
	}

	login(): void {
		this.authService.login(this.formCtrlValue).subscribe({
			next: () => {
				this.successMessage();
				this.setLoading();
			},
			error: (error: HttpErrorResponse) => {
				this.setLoading();
				this.errorMessage(error.message);
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

	navigateAfterSucceed(): void {
		timer(2000)
			.pipe(take(1))
			.subscribe(() => this.router.navigateByUrl('/'));
	}

	onSubmit() {
		this.isLoading = true;
		if (this.form.valid) {
			this.login();
		} else {
			this.validationService.markAllFormControlsAsTouched(this.form);
		}
	}

	successMessage() {
		this.toastService.showSuccessToast('Success', 'Login Successfully!');
	}

	errorMessage(message: string) {
		this.toastService.showErrorToast('Error', message);
	}
}
