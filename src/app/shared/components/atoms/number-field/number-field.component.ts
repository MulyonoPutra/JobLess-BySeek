import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { ValidationService } from '../../../services/validation.service';

@Component({
    selector: 'app-number-field',
    standalone: true,
    imports: [CommonModule, InputNumberModule, FormsModule, ReactiveFormsModule, FloatLabelModule],
    templateUrl: './number-field.component.html',
    styleUrls: ['./number-field.component.scss'],
})
export class NumberFieldComponent {
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
