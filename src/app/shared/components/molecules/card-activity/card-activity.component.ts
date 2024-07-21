import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CommonModule } from '@angular/common';
import { SavedJobs } from '../../../../core/domain/entities/saved-jobs';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';

@Component({
    selector: 'app-card-activity',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule, ButtonComponent, TimeAgoPipe],
    templateUrl: './card-activity.component.html',
    styleUrls: ['./card-activity.component.scss'],
})
export class CardActivityComponent {
    @Input() isLoading!: boolean;
    @Input() borderColor!: string;
    @Input({ required: false }) isButtonHidden?: boolean;
    @Input({ required: false }) data!: SavedJobs;
    @Output() clicked = new EventEmitter<void>();
    @Output() removed = new EventEmitter<string>();

    onClick(): void {
        this.clicked.emit();
    }

    onRemove(): void {
        this.removed.emit();
    }
}
