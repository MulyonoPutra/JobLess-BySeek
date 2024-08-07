import { CommonModule } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { timer, take } from 'rxjs';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { UpdateSummaryDto } from '../../../../core/domain/dto/update-summary.dto';
import { ProfileService } from '../../services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from '../../../../shared/services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StorageService } from '../../../../core/services/storage.service';
import { EditorComponent } from '../../../../shared/components/atoms/editor/editor.component';

@Component({
    selector: 'app-summary-form',
    standalone: true,
    imports: [
        CommonModule,
        FormInputFieldComponent,
        FormsModule,
        ReactiveFormsModule,
        ButtonComponent,
        EditorComponent,
    ],
    templateUrl: './summary-form.component.html',
    styleUrls: ['./summary-form.component.scss'],
})
export class SummaryFormComponent implements OnInit {
    form!: FormGroup;
    isLoading: boolean = false;
    label!: string;
    summary!: string;
    updateSummaryDto!: UpdateSummaryDto;
    seekerId!: string;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly profileService: ProfileService,
        private readonly toastService: ToastService,
        private readonly storageService: StorageService,
        private readonly destroyRef: DestroyRef,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
    ) {
        this.updateSummaryDto = this.config.data;
        this.seekerId = this.storageService.getSeekerIdentity();
    }

    ngOnInit(): void {
        this.formInitialized();
        this.prepopulateForm(this.updateSummaryDto);
    }

    formInitialized(): void {
        this.form = this.formBuilder.group({
            summary: ['', Validators.required],
        });
    }

    get formCtrlValue() {
        return {
            summary: this.form.get('summary')?.value,
        };
    }

    prepopulateForm(dto: UpdateSummaryDto): void {
        this.form.patchValue({
            summary: dto.summary,
        });
    }

    onUpdate(): void {
        this.profileService
            .updateSummary(this.seekerId, this.formCtrlValue)
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

    onSubmit() {
        this.isLoading = true;
        if (this.updateSummaryDto.id) {
            this.onUpdate();
        } else {
            this.onCreate();
        }
        this.form.reset();
    }

    onCreate() {
        this.profileService
            .createSummary(this.formCtrlValue)
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

    get submitButtonLabel(): string {
        return this.label;
    }

    get cancelButtonLabel(): string {
        return 'Cancel';
    }
}
