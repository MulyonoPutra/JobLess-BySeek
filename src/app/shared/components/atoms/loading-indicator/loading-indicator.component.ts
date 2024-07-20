import { CommonModule } from '@angular/common';
import { Component, Input, inject, type OnInit } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';

@Component({
    selector: 'app-loading-indicator',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './loading-indicator.component.html',
    styleUrls: ['./loading-indicator.component.scss'],
    providers: [LoadingService],
})
export class LoadingIndicatorComponent implements OnInit {
    @Input() loadingIndicator!: boolean;

    protected loading = inject(LoadingService);

    ngOnInit(): void {}
}
