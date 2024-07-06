import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
	selector: 'app-section-header-profile',
	standalone: true,
	imports: [CommonModule, AngularSvgIconModule],
	templateUrl: './section-header-profile.component.html',
	styleUrls: ['./section-header-profile.component.scss'],
})
export class SectionHeaderProfileComponent {
	@Input() title!: string;
	@Input({required: false}) seekerId?: string;
	@Output() created = new EventEmitter<void>();

	onClick(): void {
		this.created.emit();
	}
}
