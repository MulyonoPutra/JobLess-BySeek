import { Component, Input, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../services/loading.service';

@Component({
    selector: 'app-loading-indicator',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './loading-indicator.component.html',
    styleUrls: ['./loading-indicator.component.scss'],
    providers: [LoadingService],
})
export class LoadingIndicatorComponent {
    @Input() loadingIndicator!: boolean;

    protected loading = inject(LoadingService);
}
