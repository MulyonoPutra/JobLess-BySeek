import { CommonModule } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { CardJobAdsComponent } from '../../../../shared/components/molecules/card-job-ads/card-job-ads.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../../../core/domain/entities/company';
import { StorageService } from '../../../../core/services/storage.service';
import { CompanyService } from '../../services/company.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { RupiahPipe } from '../../../../shared/pipes/rupiah.pipe';

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
				console.log(response);
				this.company = response['data'];
			},
		});
	}

	onDetails(id: string): void {
		this.router.navigateByUrl(`/`);
	}

	onBookmark(): void {}

	onMark(): void {}
}
