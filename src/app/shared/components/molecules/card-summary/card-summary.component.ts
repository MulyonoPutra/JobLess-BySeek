import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-card-summary',
	standalone: true,
	imports: [CommonModule, AngularSvgIconModule],
	templateUrl: './card-summary.component.html',
	styleUrls: ['./card-summary.component.scss'],
})
export class CardSummaryComponent {
	@Input() summary!: string;

	@Output() edited = new EventEmitter<string>();
	textLimit: number = 150;
	isExpanded: boolean = false;

	toggleReadMore() {
		this.isExpanded = !this.isExpanded;
	}

	onClick(id: string): void {
		this.edited.emit(id);
	}
}
