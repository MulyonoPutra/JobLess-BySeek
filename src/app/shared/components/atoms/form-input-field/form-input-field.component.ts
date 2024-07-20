import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ValidationService } from '../../../services/validation.service';

@Component({
    selector: 'app-form-input-field',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FloatLabelModule, InputTextModule],
    templateUrl: './form-input-field.component.html',
    styleUrls: ['./form-input-field.component.scss'],
    providers: [ValidationService],
})
export class FormInputFieldComponent {
    @Input() label!: string;
    @Input() fieldName!: string;
    @Input() formGroup!: FormGroup;
    @Input() isDisabled!: FormGroup;

    constructor(private validation: ValidationService) {}

    get isInvalid() {
        const control = this.formGroup.get(this.fieldName) as FormControl;
        return this.validation.isInvalid(control);
    }

    get errorMessage(): string {
        const control = this.formGroup.get(this.fieldName) as FormControl;
        return this.validation.getErrorMessage(control);
    }

    get classFilled(): { [key: string]: boolean } {
        const isFilled = this.formGroup.get(this.fieldName)?.value !== '';
        return { 'p-filled': isFilled };
    }

    get classLabel() {
        return {
            'label-valid': !this.isInvalid,
            'label-invalid': this.isInvalid,
        };
    }
}
