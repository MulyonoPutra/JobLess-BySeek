import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CardSettingsComponent } from '../../../../shared/components/molecules/card-settings/card-settings.component';

@Component({
	selector: 'app-settings',
	standalone: true,
	imports: [CommonModule, AngularSvgIconModule, CardSettingsComponent],
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
	ngOnInit(): void {}
}
