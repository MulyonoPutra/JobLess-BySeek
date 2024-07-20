import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, type OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-prompt',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profile-prompt.component.html',
    styleUrls: ['./profile-prompt.component.scss'],
})
export class ProfilePromptComponent {
    router: Router = inject(Router);

    navigate(): void {
        this.router.navigate(['/profile']);
    }
}
