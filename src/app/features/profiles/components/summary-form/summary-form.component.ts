import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
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
import { Seeker } from '../../../../core/domain/entities/seeker';
import { UpdateSummaryDto } from '../../../../core/domain/dto/update-summary.dto';
import { ProfileService } from '../../services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';

@Component({
	selector: 'app-summary-form',
	standalone: true,
	imports: [CommonModule, FormInputFieldComponent, FormsModule, ReactiveFormsModule, ButtonComponent],
	templateUrl: './summary-form.component.html',
	styleUrls: ['./summary-form.component.scss'],
})
export class SummaryFormComponent implements OnInit {
	form!: FormGroup;
	isLoading: boolean = false;
  label!: string;

  updateSummaryDto!: UpdateSummaryDto;

  @Input() data!: any;

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly router: Router,
		private readonly profileService: ProfileService,
	) {}

	ngOnInit(): void {
    this.formInitialized();
    this.prepopulateForm(this.data)
	}

  formInitialized(): void {
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

  prepopulateForm(dto: UpdateSummaryDto): void {
    this.form.patchValue({
      summary: dto.summary,
    });
  }

  onUpdate(): void {
    this.updateSummaryDto = this.data;
    this.profileService.updateSummary(this.updateSummaryDto.id!, this.formCtrlValue).subscribe({
      next: () => {
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      },
      complete: () => {
        this.navigateAfterSucceed();
      },
    });
  }

	navigateAfterSucceed(): void {
		timer(1000)
			.pipe(take(1))
			.subscribe(() => this.router.navigateByUrl('/profile'));
	}

	onSubmit() {
		console.log(this.formCtrlValue);
		setTimeout(() => {
			this.isLoading = false;
		}, 3000);
		this.isLoading = true;
		this.form.reset();
	}

  get submitButtonLabel(): string {
    return this.label;
  }

  get cancelButtonLabel(): string {
    return 'Cancel';
  }
}
