import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { Application } from '../../../../core/domain/entities/application';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';

@Component({
    selector: 'app-card-application',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule, ButtonComponent, TimeAgoPipe],
    templateUrl: './card-application.component.html',
    styleUrls: ['./card-application.component.scss'],
})
export class CardApplicationComponent implements OnInit {
    @Input() isLoading!: boolean;
    @Input() borderColor!: string;
    @Input({ required: false }) data!: Application;
    @Output() clicked = new EventEmitter<void>();
    @Output() removed = new EventEmitter<string>();

    sanitized!: SafeHtml;

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        this.sanitized = this.sanitizer.bypassSecurityTrustHtml(this.data?.jobAds?.description);
    }

    onClick(): void {
        this.clicked.emit();
    }

    onRemove(): void {
        this.removed.emit();
    }
}
