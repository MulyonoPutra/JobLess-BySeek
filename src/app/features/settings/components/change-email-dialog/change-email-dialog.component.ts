import { CommonModule } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast.service';
import { ValidationService } from '../../../../shared/services/validation.service';
import { SettingsService } from '../../services/settings.service';
import { timer, take } from 'rxjs';
import { ChangeEmailDto } from '../../../../core/domain/dto/change-email.dto';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';

@Component({
  selector: 'app-change-email-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    FormInputFieldComponent
  ],
  templateUrl: './change-email-dialog.component.html',
  styleUrls: [ './change-email-dialog.component.scss' ],
})
export class ChangeEmailDialogComponent implements OnInit {

  form!: FormGroup;
  userId!: string;
  isLoading: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    private readonly settingsService: SettingsService,
    private readonly validationService: ValidationService,
    private readonly toastService: ToastService,
    private readonly dialogConfig: DynamicDialogConfig,
  ) {
    this.userId = this.dialogConfig.data?.id;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email]],
      },
      { validators: this.validationService.changeEmailValidators },
    );
  }

  get formCtrlValue(): ChangeEmailDto {
    return {
      email: this.form.get('email')?.value,
    };
  }

  onSave(): void {
     this.settingsService.changeEmail(this.userId, this.formCtrlValue)
       .pipe(takeUntilDestroyed(this.destroyRef))
       .subscribe({
         next: () => {
           this.toastService.showSuccessToast('Success', 'Change email Successfully!');
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

  private setLoading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  navigateAfterSucceed(): void {
    timer(1000)
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl('/settings'));
  }

  onSubmit() {
    this.isLoading = true;
    if (this.form.valid) {
      this.onSave();
    }
  }

}
