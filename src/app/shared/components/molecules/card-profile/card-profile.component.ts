import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { MonthYearPipe } from '../../../pipes/month-year.pipe';

@Component({
	selector: 'app-card-profile',
	standalone: true,
	imports: [CommonModule, AngularSvgIconModule],
	templateUrl: './card-profile.component.html',
	styleUrls: ['./card-profile.component.scss'],
})
export class CardProfileComponent implements AfterViewInit {
	@Input() text!: string;
	@Input({ required: false }) title?: string;
	@Input({ required: false }) name?: string;
	@Input({ required: false }) duration?: string;
	@Input({ required: false }) additional?: string | number;
	@Input({ required: false }) description?: string;
	@Input({ required: false }) isEducation?: boolean;

	@Input() maxHeight: number = 10;

	@Output() edited = new EventEmitter<string>();

	public isCollapsed: boolean = false;
	public isCollapsable: boolean = false;

	constructor(
		private elementRef: ElementRef,
		private cdr: ChangeDetectorRef,
	) {}

	ngAfterViewInit() {
		let currentHeight =
			this.elementRef.nativeElement.getElementsByTagName('div')[0].offsetHeight;
		if (currentHeight > this.maxHeight) {
			this.isCollapsed = true;
			this.isCollapsable = true;
			this.cdr.detectChanges();
		}
	}

	onClick(id: string): void {
		this.edited.emit(id);
	}
}
