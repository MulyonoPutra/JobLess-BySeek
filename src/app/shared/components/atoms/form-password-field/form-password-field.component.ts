import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { SvgIcons } from '../../../../core/constants/icons';
import { ValidationService } from '../../../services/validation.service';
import { debounceTime } from 'rxjs';

@Component({
    selector: 'app-form-password-field',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AngularSvgIconModule],
    templateUrl: './form-password-field.component.html',
    styleUrls: ['./form-password-field.component.scss'],
})
export class FormPasswordFieldComponent implements OnInit {
    @Input() label!: string;
    @Input() fieldName!: string;
    @Input() formGroup!: FormGroup;
    @Input() isDisabled!: FormGroup;

    isPasswordVisible: boolean = false;

    hasUpperCase: boolean = false;
    hasLowerCase: boolean = false;
    hasNumeric: boolean = false;
    hasSpecialChar: boolean = false;
    isValidLength: boolean = false;

    iconChecklist = SvgIcons.checklistGreen;
    iconClose = SvgIcons.closeRed;
    iconEyeOpen = SvgIcons.eyeOpen;
    iconEyeClose = SvgIcons.eyeClose;

    constructor(private validation: ValidationService) {}

    ngOnInit(): void {
        this.formGroup
            .get(this.fieldName)
            ?.valueChanges.pipe(debounceTime(300))
            .subscribe((value) => {
                this.updateValidationStates(value);
            });
    }

    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
    }

    get isInvalid() {
        const control = this.formGroup.get(this.fieldName) as FormControl;
        return this.validation.isInvalid(control);
    }

    get errorMessage(): string {
        const control = this.formGroup.get(this.fieldName) as FormControl;
        return this.validation.getErrorMessage(control);
    }

    get classFilled(): { [key: string]: boolean } {
        return {
            valid: !this.isInvalid,
            invalid: this.isInvalid,
        };
    }

    private updateValidationStates(value: string) {
        this.hasUpperCase = this.validation.hasUpperCase(value);
        this.hasLowerCase = this.validation.hasLowerCase(value);
        this.hasNumeric = this.validation.hasNumeric(value);
        this.hasSpecialChar = this.validation.hasSpecialChar(value);
        this.isValidLength = this.validation.isValidLength(value, 6);
    }
}
