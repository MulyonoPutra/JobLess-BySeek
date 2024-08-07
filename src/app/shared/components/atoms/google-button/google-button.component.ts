import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-google-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './google-button.component.html',
    styleUrls: ['./google-button.component.scss'],
})
export class GoogleButtonComponent {}
