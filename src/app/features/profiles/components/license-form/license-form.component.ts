import { CommonModule } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { EditorComponent } from '../../../../shared/components/atoms/editor/editor.component';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { Router } from '@angular/router';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { StorageService } from '../../../../core/services/storage.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProfileService } from '../../services/profile.service';
import { CreateLicenseDto } from '../../../../core/domain/dto/create-license.dto';
import { timer, take } from 'rxjs';
import { FormCalendarFieldComponent } from '../../../../shared/components/atoms/form-calendar-field/form-calendar-field.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/store/store';
import * as LicenseActions from '../../../../core/store/actions/license.action';
import { License } from '../../../../core/domain/entities/license';

@Component({
    selector: 'app-license-form',
    standalone: true,
    imports: [
        CommonModule,
        FormInputFieldComponent,
        FormsModule,
        ReactiveFormsModule,
        ButtonComponent,
        EditorComponent,
        FormCalendarFieldComponent,
    ],
    templateUrl: './license-form.component.html',
    styleUrls: ['./license-form.component.scss'],
})
export class LicenseFormComponent implements OnInit {
    form!: FormGroup;
    isLoading: boolean = false;
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
        private readonly store: Store<AppState>,
    ) {
        // this.updateSummaryDto = this.config.data;
        this.seekerId = this.storageService.getSeekerIdentity();
    }

    ngOnInit(): void {
        this.formInitialized();
    }

    formInitialized(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            organization: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    get formCtrlValue(): License {
        return {
            name: this.form.get('name')?.value,
            organization: this.form.get('organization')?.value,
            description: this.form.get('description')?.value,
        };
    }

    prepopulateForm(dto: CreateLicenseDto): void {
        this.form.patchValue({
            name: dto.name,
            organization: dto.organization,
            description: dto.description,
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

    saveChanges(): void {
        this.store.dispatch(
            LicenseActions.addLicense({ seekerId: this.seekerId, licenses: [this.formCtrlValue] }),
        );
    }

    onSubmit() {
        this.isLoading = true;
        if (this.form.valid) {
            this.saveChanges();
        }
        this.form.reset();
    }
}
