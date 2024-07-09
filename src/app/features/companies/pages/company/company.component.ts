import { Component, DestroyRef, OnInit } from '@angular/core';

import { CardCompanyComponent } from '../../../../shared/components/molecules/card-company/card-company.component';
import { CommonModule } from '@angular/common';
import { Company } from '../../../../core/domain/entities/company';
import { CompanyService } from '../../services/company.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OVERLAY_IMAGES } from '../../../../core/constants/overlay-images';
import { OverlayImageContainerComponent } from '../../../../shared/components/molecules/overlay-image-container/overlay-image-container.component';
import { Router } from '@angular/router';
import { SearchFieldComponent } from '../../../../shared/components/molecules/search-field/search-field.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-company',
	standalone: true,
	imports: [
		CommonModule,
		SearchFieldComponent,
		CardCompanyComponent,
		OverlayImageContainerComponent,
	],
	templateUrl: './company.component.html',
	styleUrl: './company.component.scss',
	providers: [CompanyService],
})
export class CompanyComponent implements OnInit {
  overlayImage = OVERLAY_IMAGES.company;

	companies!: Company[];

	constructor(
		private readonly router: Router,
		private readonly companyService: CompanyService,
		private readonly destroyRef: DestroyRef,
    private readonly toastService: ToastService,
	) {}

	ngOnInit(): void {
		this.findAll();
	}

	findAll(): void {
		this.companyService
			.findAll()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (response: Company[]) => {
					this.companies = response;
				},
				error: (error: HttpErrorResponse) => {
          this.toastService.showErrorToast('Error', error.message);
				},
				complete: () => {},
			});
	}

	onDetails(id: string): void {
		this.router.navigateByUrl(`/company/details/${id}/overview`);
	}
}
