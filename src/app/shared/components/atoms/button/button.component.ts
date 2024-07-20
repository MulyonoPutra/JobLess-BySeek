import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule],
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Input({ required: false }) label!: string;
    @Input({ required: false }) icons?: string;
    @Input({ required: false }) width?: string;
    @Input({ required: false }) isDisabled!: boolean;
    @Input({ required: false }) isCancel: boolean = false;
    @Input({ required: false }) isLoading!: boolean;
    @Input({ required: false }) isLarge!: boolean;
    @Input({ required: false }) withIcon!: boolean;
    @Input() type = 'cancel' || 'save';

    @Output() clicked = new EventEmitter();

    onClick(): void {
        this.clicked.emit();
    }

    getButtonClass() {
        return {
            save: this.type === 'save',
            'w-full': this.isLarge,
            cancel: this.type !== 'save',
        };
    }
}
