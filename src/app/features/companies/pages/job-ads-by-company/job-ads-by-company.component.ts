import { CommonModule } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Company } from '../../../../core/domain/entities/company';
import { JobAds } from '../../../../core/domain/entities/job-ads';
import { CardJobAdsComponent } from '../../../../shared/components/molecules/card-job-ads/card-job-ads.component';
import { RupiahPipe } from '../../../../shared/pipes/rupiah.pipe';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { CompanyService } from '../../services/company.service';

@Component({
	selector: 'app-job-ads-by-company',
	standalone: true,
	imports: [CommonModule, AngularSvgIconModule, CardJobAdsComponent, TimeAgoPipe, RupiahPipe],
	templateUrl: './job-ads-by-company.component.html',
	styleUrls: ['./job-ads-by-company.component.scss'],
})
export class JobAdsByCompanyComponent implements OnInit {
	company!: Company;
	companyId!: string;
	visible = false;
	jobAds!: JobAds[];

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly destroyRef: DestroyRef,
		private readonly companyService: CompanyService,
	) {}

	ngOnInit(): void {
		this.getCompanyId();
		this.findJobAdsByCompanyId();
	}

	getCompanyId() {
		this.route.parent?.data.subscribe({
			next: (response) => {
				this.companyId = response['data'].id;
			},
		});
	}

	findJobAdsByCompanyId() {
		this.companyService
			.findJobAdsByCompanyId(this.companyId)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (response) => {
					this.jobAds = response;
				},
			});
	}

	onDetails(id: string): void {
		this.router.navigateByUrl(`/jobs/details/${id}`);
	}

	onBookmark(): void {}

	onMark(): void {}
}
