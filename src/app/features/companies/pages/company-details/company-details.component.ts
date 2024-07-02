import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Company } from '../../../../core/domain/entities/company';
import { StorageService } from '../../../../core/services/storage.service';
import { CompanyService } from '../../services/company.service';

@Component({
	selector: 'app-company-details',
	standalone: true,
	imports: [CommonModule, AngularSvgIconModule, RouterOutlet, RouterModule],
	templateUrl: './company-details.component.html',
	styleUrls: ['./company-details.component.scss'],
})
export class CompanyDetailsComponent implements OnInit {
	companyId!: string;

	company!: Company;
	visible = false;

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly destroyRef: DestroyRef,
	) {}

	ngOnInit(): void {
		this.passIdToOverview();
	}

	passIdToOverview() {
		this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
			next: (params) => {
				this.companyId = params.get('id')!;
				this.router.navigate(['overview'], { relativeTo: this.route });
			},
		});
	}

	onOverview(): void {
		this.router.navigateByUrl(`company/details/${this.companyId}/overview`);
	}
}
