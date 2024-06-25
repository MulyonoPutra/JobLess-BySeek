import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ValidationService } from '../../../services/validation.service';

@Component({
	selector: 'app-form-input-field',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
		const control = this.formGroup.get(this.fieldName) as FormControl;
		const isEmpty = control.value === '';
		return {
			valid: !this.isInvalid,
			invalid: this.isInvalid,
		};
	}
}
