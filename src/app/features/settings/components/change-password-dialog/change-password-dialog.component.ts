import { CommonModule } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast.service';
import { ValidationService } from '../../../../shared/services/validation.service';
import { ChangePasswordDto } from '../../../../core/domain/dto/change-password.dto';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { FormPasswordFieldComponent } from '../../../../shared/components/atoms/form-password-field/form-password-field.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { timer, take } from 'rxjs';

@Component({
    selector: 'app-change-password-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ButtonComponent,
        FormPasswordFieldComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './change-password-dialog.component.html',
    styleUrls: ['./change-password-dialog.component.scss'],
})
export class ChangePasswordDialogComponent implements OnInit {
    form!: FormGroup;
    isLoading: boolean = false;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly destroyRef: DestroyRef,
        private readonly settingsService: SettingsService,
        private readonly validationService: ValidationService,
        private readonly toastService: ToastService,
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.form = this.formBuilder.group(
            {
                currentPassword: ['', Validators.required],
                newPassword: [
                    '',
                    [Validators.required, this.validationService.combinedPasswordValidator()],
                ],
                confirmPassword: ['', Validators.required],
            },
            { validators: this.validationService.changePasswordValidators },
        );
    }

    get formCtrlValue(): ChangePasswordDto {
        return {
            currentPassword: this.form.get('currentPassword')?.value,
            newPassword: this.form.get('newPassword')?.value,
        };
    }

    onSave(): void {
        this.settingsService
            .changePasword(this.formCtrlValue)
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
                    this.navigateAfterSucceed();
                },
            });
    }

    navigateAfterSucceed(): void {
        timer(1000)
            .pipe(take(1))
            .subscribe(() => {
                this.form.reset();
                this.router.navigateByUrl('/settings');
            });
    }

    private setLoading() {
        setTimeout(() => {
            this.isLoading = false;
        }, 2000);
    }

    onSubmit() {
        this.isLoading = true;
        if (this.form.valid) {
            this.onSave();
        } else {
            this.validationService.markAllFormControlsAsTouched(this.form);
        }
    }
}
