/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dropdown-header',
    standalone: true,
    imports: [CommonModule, RouterModule, AngularSvgIconModule],
    templateUrl: './dropdown-header.component.html',
    styleUrls: ['./dropdown-header.component.scss'],
})
export class DropdownHeaderComponent {
    @Input() title!: string;
    @Input() menu!: any[];
    @Input() isMenuItems = false;

    @Output() logout = new EventEmitter<void>();

    onLogout(): void {
        this.logout.emit();
    }
}
