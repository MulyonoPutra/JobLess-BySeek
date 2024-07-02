import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, type OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../../core/services/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Company } from '../../../../core/domain/entities/company';

@Component({
	selector: 'app-company-overview',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './company-overview.component.html',
	styleUrls: ['./company-overview.component.scss'],
	providers: [CompanyService],
})
export class CompanyOverviewComponent implements OnInit {
	company!: Company;
	companyId!: string;
	visible = false;

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly destroyRef: DestroyRef,
		private readonly companyService: CompanyService,
		private readonly storageService: StorageService,
	) {}

	ngOnInit(): void {
		this.route.parent?.data.subscribe({
			next: (response) => {
				this.company = response['data'];
			},
		});
	}
}
