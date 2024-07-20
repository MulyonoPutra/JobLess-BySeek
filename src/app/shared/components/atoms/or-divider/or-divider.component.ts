import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-or-divider',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div
            class="py-6 flex items-center text-sm text-gray-400 uppercase before:flex-1 before:border-t before:me-6 after:flex-1 after:border-t after:ms-6 dark:text-neutral-500 dark:before:border-neutral-700 dark:after:border-neutral-700">
            Or
        </div>
    `,
    styles: `
        :host {
            display: block;
        }
    `,
})
export class OrDividerComponent {}
