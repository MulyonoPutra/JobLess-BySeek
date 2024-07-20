import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { Company } from '../../../../core/domain/entities/company';

@Component({
    selector: 'app-card-company',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule],
    templateUrl: './card-company.component.html',
    styleUrls: ['./card-company.component.scss'],
})
export class CardCompanyComponent {
    @Input() company!: Company;
    @Output() clicked = new EventEmitter<string>();

    onClick(id: string): void {
        this.clicked.emit(id);
    }
}
