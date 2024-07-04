import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { timer, take } from 'rxjs';
import { UpdateSummaryDto } from '../../../../core/domain/dto/update-summary.dto';
import { ProfileService } from '../../services/profile.service';
import { WorkHistoryDto } from '../../../../core/domain/dto/work-history.dto';

@Component({
  selector: 'app-work-history-form',
  standalone: true,
  imports: [
    CommonModule, FormInputFieldComponent, FormsModule, ReactiveFormsModule, ButtonComponent
  ],
  templateUrl: './work-history-form.component.html',
  styleUrls: [ './work-history-form.component.scss' ],
})
export class WorkHistoryFormComponent implements OnChanges, OnInit {

  form!: FormGroup;
  isLoading: boolean = false;
  label!: string;

  updateWorkHistoryDto!: WorkHistoryDto;

  @Input() data!: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.formInitialized()
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.prepopulateForm(this.data);
    }
  }

  formInitialized(): void {
    this.form = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      position: ['', Validators.required],
      companyName: ['', Validators.required],
      responsibilities: ['', Validators.required],
    });
  }

  get formCtrlValue() {
    return {
      startDate: this.form.get('startDate')?.value,
      endDate: this.form.get('endDate')?.value,
      location: this.form.get('location')?.value,
      position: this.form.get('position')?.value,
      companyName: this.form.get('companyName')?.value,
      responsibilities: this.form.get('responsibilities')?.value,
    };
  }

  prepopulateForm(dto: WorkHistoryDto): void {
    this.form.patchValue({
      startDate: new Date(dto.startDate!),
      endDate: new Date(dto.endDate!),
      location: dto.location,
      position: dto.position,
      companyName: dto.companyName,
      responsibilities: dto.responsibilities,
    });
  }

  onUpdate(): void {
    this.updateWorkHistoryDto = this.data;
    this.profileService.updateWorkHistory(this.updateWorkHistoryDto.id!, this.formCtrlValue).subscribe({
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
