import { Component, EventEmitter, Output } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tooltip-button',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule],
    templateUrl: './tooltip-button.component.html',
    styleUrls: ['./tooltip-button.component.scss'],
})
export class TooltipButtonComponent {
    @Output() clicked = new EventEmitter<void>();

    onClick(): void {
        this.clicked.emit();
    }
}
