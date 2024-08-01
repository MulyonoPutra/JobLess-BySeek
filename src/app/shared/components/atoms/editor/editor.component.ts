import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { EditorModule } from 'primeng/editor';
import { ValidationService } from '../../../services/validation.service';

@Component({
    selector: 'app-editor',
    standalone: true,
    imports: [CommonModule, EditorModule, FormsModule, ReactiveFormsModule],
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
    @Input() fieldName!: string;
    @Input() label!: string;
    @Input() formGroup!: FormGroup;

    constructor(private validation: ValidationService) {}

    get isInvalid() {
        const control = this.formGroup.get(this.fieldName) as FormControl;
        return this.validation.isInvalid(control);
    }

    get getErrorMessage(): string {
        const control = this.formGroup.get(this.fieldName) as FormControl;
        return this.validation.getErrorMessage(control);
    }
}
