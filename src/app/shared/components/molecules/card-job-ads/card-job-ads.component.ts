import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-card-job-ads',
	standalone: true,
	imports: [CommonModule, AngularSvgIconModule],
	templateUrl: './card-job-ads.component.html',
	styleUrls: ['./card-job-ads.component.scss'],
})
export class CardJobAdsComponent {
	@Output() marked = new EventEmitter<void>();
	@Output() details = new EventEmitter<string>();

	onMark(): void {
		this.marked.emit();
	}

	onDetails(id: string): void {
		this.details.emit(id);
	}
}
