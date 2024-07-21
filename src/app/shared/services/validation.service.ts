import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ValidationService {
    markAllFormControlsAsTouched(formGroup: FormGroup): void {
        Object.values(formGroup.controls).forEach((control: AbstractControl) => {
            control.markAsTouched();
            if (control instanceof FormGroup) {
                this.markAllFormControlsAsTouched(control);
            }
        });
    }

    indonesianPhoneNumber(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: unknown } | null => {
            // Indonesian phone number pattern with "0" as the starting digit
            const phoneNumberPattern = /^0\d{9,15}$/;
            const valid = phoneNumberPattern.test(control.value);
            return valid ? null : { invalidPhoneNumber: true };
        };
    }

    passwordMatchValidator(formGroup: FormGroup) {
        const password = formGroup.get('password')!;
        const confirmPassword = formGroup.get('confirmPassword')!;

        if (password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ passwordMismatch: true });
        } else {
            confirmPassword.setErrors(null);
        }
    }

    changePasswordValidators(formGroup: FormGroup) {
        const newPassword = formGroup.get('newPassword')!;
        const confirmPassword = formGroup.get('confirmPassword')!;

        if (newPassword.value !== confirmPassword.value) {
            confirmPassword.setErrors({ passwordMismatch: true });
        } else {
            confirmPassword.setErrors(null);
        }
    }

    changeEmailValidators(formGroup: FormGroup) {
        const email = formGroup.get('email')!;
        const confirmEmail = formGroup.get('confirmEmail')!;

        if (email.value !== confirmEmail.value) {
            confirmEmail.setErrors({ emailMismatch: true });
        } else {
            confirmEmail.setErrors(null);
        }
    }

    lowerCaseValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: unknown } | null => {
            const value = control.value;
            if (value == null) {
                return null;
            }
            const isLowerCase = value === value.toLowerCase();
            return isLowerCase ? null : { lowerCase: true };
        };
    }

    hasLowerCase(value: string): boolean {
        return /[a-z]/.test(value);
    }

    hasUpperCase(value: string): boolean {
        return /[A-Z]/.test(value);
    }

    hasNumeric(value: string): boolean {
        return /[0-9]/.test(value);
    }

    hasSpecialChar(value: string): boolean {
        return /[!@#$%^&*(),.?":{}|<>]/.test(value);
    }

    isValidLength(value: string, minLength: number): boolean {
        return value.length >= minLength;
    }

    combinedPasswordValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: unknown } | null => {
            const value = control.value;
            const errors: { [key: string]: unknown } = {};

            if (!/[a-z]/.test(value)) {
                errors['hasLowerCase'] = true;
            }
            if (!/[A-Z]/.test(value)) {
                errors['hasUpperCase'] = true;
            }
            if (!/[0-9]/.test(value)) {
                errors['hasNumeric'] = true;
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                errors['hasSpecialChar'] = true;
            }
            if (!value || value.length < 6) {
                errors['isValidLength'] = true;
            }

            return Object.keys(errors).length ? errors : null;
        };
    }

    isInvalid(control: FormControl): boolean {
        return control && control.touched && control.invalid && (control.dirty || control.touched);
    }

    getErrorMessage(control: FormControl): string {
        if (control.errors?.['required']) {
            return 'This field is required.';
        }
        if (control.errors?.['email']) {
            return 'Invalid email format.';
        }
        if (control.errors?.['minlength']) {
            const requiredLength = control.errors['minlength'].requiredLength;
            return `Password should be at least ${requiredLength} characters long.`;
        }
        if (control.errors?.['maxlength']) {
            const requiredLength = control.errors['maxlength'].requiredLength;
            return `This field at least maximum ${requiredLength} characters long.`;
        }
        if (control.errors?.['passwordMismatch']) {
            return 'Passwords do not match.';
        }
        if (control.errors?.['emailMismatch']) {
            return 'The email does not match.';
        }
        if (control.errors?.['invalidPhoneNumber']) {
            return 'Invalid phone number format.';
        }

        // if (control.errors?.['invalidPassword']) {
        //   return 'Password must be at least 6 characters long, and include uppercase, lowercase, numbers, and special characters.';
        // }
        if (control.errors?.['hasLowerCase']) {
            return 'Password must contain at least one lowercase letter.';
        }
        if (control.errors?.['hasUpperCase']) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (control.errors?.['hasNumeric']) {
            return 'Password must contain at least one number.';
        }
        if (control.errors?.['hasSpecialChar']) {
            return 'Password must contain at least one special character.';
        }
        if (control.errors?.['isValidLength']) {
            return 'Password must be at least 6 characters long.';
        }

        return '';
    }
}
