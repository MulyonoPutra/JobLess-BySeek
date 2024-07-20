import { Component, Input } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-badge',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule],
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
    @Input() skill!: string;
}
