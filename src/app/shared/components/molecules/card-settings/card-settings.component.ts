import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-card-settings',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule],
    templateUrl: './card-settings.component.html',
    styleUrls: ['./card-settings.component.scss'],
})
export class CardSettingsComponent {
    @Input() title!: string;
    @Input({ required: false }) value?: string;
    @Input({ required: false }) isDeleted?: boolean;
    @Input({ required: false }) height?: string;

    @Output() edited = new EventEmitter<void>();
    @Output() deleted = new EventEmitter<void>();

    onEdited(): void {
        this.edited.emit();
    }

    onDelete(): void {
        this.deleted.emit();
    }
}
