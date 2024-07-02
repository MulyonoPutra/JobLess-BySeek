import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import {
	FormsModule,
	ReactiveFormsModule,
	FormGroup,
	FormBuilder,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { timer, take } from 'rxjs';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';

@Component({
	selector: 'app-summary-form',
	standalone: true,
	imports: [CommonModule, FormInputFieldComponent, FormsModule, ReactiveFormsModule],
	templateUrl: './summary-form.component.html',
	styleUrls: ['./summary-form.component.scss'],
})
export class SummaryFormComponent implements OnInit {
	form!: FormGroup;
	isLoading: boolean = false;

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly router: Router,
	) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			summary: ['', Validators.required],
		});
	}

	get f() {
		return this.form.controls;
	}

	get formCtrlValue() {
		return {
			summary: this.form.get('summary')?.value,
		};
	}

	navigateAfterSucceed(): void {
		timer(1000)
			.pipe(take(1))
			.subscribe(() => this.router.navigateByUrl('/'));
	}

	onSubmit() {
		console.log(this.formCtrlValue);
		setTimeout(() => {
			this.isLoading = false;
		}, 3000);
		this.isLoading = true;
		this.form.reset();
	}
}
