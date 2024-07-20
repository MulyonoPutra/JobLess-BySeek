import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { JobAds } from '../../../../core/domain/entities/job-ads';
import { RupiahPipe } from '../../../pipes/rupiah.pipe';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';

@Component({
	selector: 'app-card-job-ads',
	standalone: true,
	imports: [CommonModule, AngularSvgIconModule, TimeAgoPipe, RupiahPipe],
	templateUrl: './card-job-ads.component.html',
	styleUrls: ['./card-job-ads.component.scss'],
})
export class CardJobAdsComponent {
	@Input() job!: JobAds;
	@Input() isBookmark!: boolean;
	@Output() marked = new EventEmitter<void>();
	@Output() details = new EventEmitter<string>();

	onMark(): void {
		this.marked.emit();
	}

	onDetails(id: string): void {
		this.details.emit(id);
	}
}
