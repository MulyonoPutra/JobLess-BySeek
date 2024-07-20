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

    @Output() edited = new EventEmitter<string>();
    @Output() deleted = new EventEmitter<string>();

    onEdited(id: string): void {
        this.edited.emit(id);
    }

    onDelete(id: string): void {
        this.deleted.emit(id);
    }
}
