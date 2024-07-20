import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [CommonModule, DialogModule],
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
    @Input() visible = false;
    @Output() hide = new EventEmitter<void>();

    onHide(): void {
        this.hide.emit();
    }

    ngOnInit(): void {}
}
