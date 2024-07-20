import { Component, EventEmitter, Output, inject } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-input-skill-form',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule, ButtonComponent, FormsModule],
    templateUrl: './input-skill-form.component.html',
    styleUrls: ['./input-skill-form.component.scss'],
})
export class InputSkillFormComponent {
    value!: string;
    router = inject(Router);

    @Output() clicked = new EventEmitter<string>();

    add(): void {
        this.clicked.emit(this.value);
    }
}
