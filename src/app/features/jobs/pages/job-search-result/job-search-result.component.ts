import { ActivatedRoute, Router } from '@angular/router';
import { Component, DestroyRef, OnInit } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CardJobAdsComponent } from '../../../../shared/components/molecules/card-job-ads/card-job-ads.component';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { JobAds } from '../../../../core/domain/entities/job-ads';
import { JobAdsService } from '../../services/job-ads.service';
import { OverlayImageContainerComponent } from '../../../../shared/components/molecules/overlay-image-container/overlay-image-container.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-job-search-result',
    standalone: true,
    imports: [
        CommonModule,
        OverlayImageContainerComponent,
        CardJobAdsComponent,
        AngularSvgIconModule,
    ],
    templateUrl: './job-search-result.component.html',
    styleUrls: ['./job-search-result.component.scss'],
})
export class JobSearchResultComponent implements OnInit {
    jobAds!: JobAds[];
    query!: string;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly destroyRef: DestroyRef,
        private readonly jobAdsService: JobAdsService,
        private readonly toastService: ToastService,
    ) {}

    ngOnInit(): void {
        this.queries();
    }

    queries(): void {
        this.route.queryParams.subscribe({
            next: (params) => {
                this.query = params['query'];
                this.onSearch(this.query);
            },
        });
    }

    onSearch(query: string): void {
        this.jobAdsService
            .search(query)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (response: JobAds[]) => {
                    this.jobAds = response;
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.showErrorToast('Error', error.message);
                },
            });
    }

    onDetails(id: string): void {
        this.router.navigateByUrl(`/jobs/details/${id}`);
    }
}
