import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, type OnInit } from '@angular/core';

@Component({
	selector: 'app-profile-prompt',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './profile-prompt.component.html',
	styleUrls: ['./profile-prompt.component.scss'],
})
export class ProfilePromptComponent implements OnInit {
	ngOnInit(): void {}

	@Output() navigate = new EventEmitter<void>();

	onClick(): void {
		this.navigate.emit();
	}
}
