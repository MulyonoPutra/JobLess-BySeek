import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    TOAST_KEY: string = 'global-toast';
    STICKY: boolean = true;

    constructor(private msgService: MessageService) {}

    async showSuccessToast(summary: string, detail: string): Promise<void> {
        this.showToast(summary, detail, 'success', 3000);
    }

    async showInfoToast(summary: string, detail: string): Promise<void> {
        this.showToast(summary, detail, 'info', 3000);
    }
    async showWarnToast(summary: string, detail: string): Promise<void> {
        this.showToast(summary, detail, 'warn', 3000);
    }

    async showErrorToast(summary: string, detail: string): Promise<void> {
        this.showToast(summary, detail, 'error', 3000);
    }

    async showToast(
        summary: string,
        detail: string,
        severity: string,
        life: number,
    ): Promise<void> {
        this.msgService.add({
            key: this.TOAST_KEY,
            severity: severity,
            summary: summary,
            detail: detail,
            sticky: this.STICKY,
            life: life,
        });
    }
}
