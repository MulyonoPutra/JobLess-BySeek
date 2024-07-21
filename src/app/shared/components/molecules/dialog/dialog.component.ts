import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [CommonModule, DialogModule],
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
    @Input() visible = false;
    @Output() hide = new EventEmitter<void>();

    onHide(): void {
        this.hide.emit();
    }
}
