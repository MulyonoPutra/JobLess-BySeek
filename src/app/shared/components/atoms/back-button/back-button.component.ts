import { CommonModule, Location } from '@angular/common';

import { Component } from '@angular/core';

@Component({
    selector: 'app-back-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './back-button.component.html',
    styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {
    constructor(private location: Location) {}

    goBack(): void {
        this.location.back();
    }
}
