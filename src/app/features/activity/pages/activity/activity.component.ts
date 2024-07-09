import { RouterModule, RouterOutlet } from '@angular/router';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'app-activity',
	standalone: true,
	imports: [CommonModule, RouterOutlet, RouterModule, AngularSvgIconModule],
	templateUrl: './activity.component.html',
	styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {}
