import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { BadgeComponent } from '../../atoms/badge/badge.component';
import { CommonModule } from '@angular/common';
import { Skill } from '../../../../core/domain/entities/skill';
import { EmptyStateComponent } from '../../atoms/empty-state/empty-state.component';

@Component({
    selector: 'app-card-skills',
    standalone: true,
    imports: [CommonModule, BadgeComponent, AngularSvgIconModule, EmptyStateComponent],
    templateUrl: './card-skills.component.html',
    styleUrls: ['./card-skills.component.scss'],
})
export class CardSkillsComponent {
    @Input() skills!: Skill[];

    @Output() edited = new EventEmitter<void>();

    onEdit(): void {
        this.edited.emit();
    }
}
