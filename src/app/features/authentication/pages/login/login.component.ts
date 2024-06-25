import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { GoogleButtonComponent } from '../../../../shared/components/atoms/google-button/google-button.component';
import { OrDividerComponent } from '../../../../shared/components/atoms/or-divider/or-divider.component';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { timer, take } from 'rxjs';
import { FormPasswordFieldComponent } from '../../../../shared/components/atoms/form-password-field/form-password-field.component';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    GoogleButtonComponent,
    OrDividerComponent,
    ButtonComponent,
    FormInputFieldComponent,
    FormPasswordFieldComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService, ValidationService],
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthenticationService,
    private readonly validationService: ValidationService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
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
        // this.successMessage();
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      },
      error: (error: HttpErrorResponse) => {
        // this.errorMessage(error);
      },
      complete: () => {
        this.navigateAfterSucceed();
      },
    });
  }

  navigateAfterSucceed(): void {
    timer(1000)
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

}
