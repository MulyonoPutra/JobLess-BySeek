import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ValidationService } from '../../../services/validation.service';

@Component({
    selector: 'app-text-area-field',
    standalone: true,
    imports: [
        CommonModule,
        InputTextareaModule,
        FormsModule,
        ReactiveFormsModule,
        FloatLabelModule,
    ],
    templateUrl: './text-area-field.component.html',
    styleUrls: ['./text-area-field.component.scss'],
    providers: [ValidationService],
})
export class TextAreaFieldComponent {
    @Input() label!: string;
    @Input() fieldName!: string;
    @Input() formGroup!: FormGroup;

    constructor(private validation: ValidationService) {}

    get isInvalid() {
        const control = this.formGroup.get(this.fieldName) as FormControl;
        return this.validation.isInvalid(control);
    }

    get errorMessage(): string {
        const control = this.formGroup.get(this.fieldName) as FormControl;
        return this.validation.getErrorMessage(control);
    }

    get classLabel() {
        return {
            'label-valid': !this.isInvalid,
            'label-invalid': this.isInvalid,
        };
    }

    get classFilled(): { [key: string]: boolean } {
        const isFilled = this.formGroup.get(this.fieldName)?.value !== '';
        return { 'p-filled': isFilled };
    }
}
