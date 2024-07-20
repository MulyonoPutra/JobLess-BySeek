import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { take, timer } from 'rxjs';
import { UpdateProfileDto } from '../../../../core/domain/dto/update-profile.dto';
import { User } from '../../../../core/domain/entities/user';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProfileService } from '../../services/profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-personal-detail-form',
    standalone: true,
    imports: [
        CommonModule,
        FormInputFieldComponent,
        FormsModule,
        ReactiveFormsModule,
        ButtonComponent,
    ],
    templateUrl: './personal-detail-form.component.html',
    styleUrls: ['./personal-detail-form.component.scss'],
})
export class PersonalDetailFormComponent implements OnInit {
    form!: FormGroup;
    isLoading: boolean = false;
    userId!: string;
    user!: User;
    updateProfileDto!: UpdateProfileDto;

    constructor(
        private readonly router: Router,
        private readonly fb: FormBuilder,
        private readonly toastService: ToastService,
        private readonly profileService: ProfileService,
        private readonly dialogConfig: DynamicDialogConfig,
        private readonly destroyRef: DestroyRef,
    ) {
        this.updateProfileDto = this.dialogConfig.data.user;
    }

    ngOnInit(): void {
        this.formInitialized();
        this.prepopulateForm(this.updateProfileDto);
    }

    formInitialized(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.maxLength(13)]],
        });
    }

    get formCtrlValue(): UpdateProfileDto {
        return {
            name: this.form.get('name')?.value,
            email: this.form.get('email')?.value,
            phone: this.form.get('phone')?.value,
        };
    }

    prepopulateForm(dto: UpdateProfileDto): void {
        this.form.patchValue({
            name: dto.name,
            email: dto.email,
            phone: dto.phone,
        });
    }

    onUpdate(): void {
        this.isLoading = true;
        this.profileService
            .updateProfile(this.updateProfileDto.id!, this.formCtrlValue)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.toastService.showSuccessToast('Success', 'Updated...');
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
