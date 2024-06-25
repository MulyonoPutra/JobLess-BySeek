import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { CardJobAdsComponent } from '../../../../shared/components/molecules/card-job-ads/card-job-ads.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-job-ads',
	standalone: true,
	imports: [CommonModule, CardJobAdsComponent],
	templateUrl: './job-ads.component.html',
	styleUrls: ['./job-ads.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobAdsComponent implements OnInit {
	constructor(private readonly router: Router) {}

	ngOnInit(): void {}

	onDetails(id: string): void {
		this.router.navigateByUrl(`/jobs/details/${id}`);
	}

	onBookmark(): void {
		console.log('onBookmark');
	}
}
