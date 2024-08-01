import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CardJobAdsComponent } from '../../../../shared/components/molecules/card-job-ads/card-job-ads.component';
import { OverlayImageContainerComponent } from '../../../../shared/components/molecules/overlay-image-container/overlay-image-container.component';
import { SearchFieldComponent } from '../../../../shared/components/molecules/search-field/search-field.component';

import { OVERLAY_IMAGES } from '../../../../core/constants/overlay-images';
import { JobAds } from '../../../../core/domain/entities/job-ads';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { JobAdsService } from '../../services/job-ads.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
    selector: 'app-job-ads',
    standalone: true,
    imports: [
        CommonModule,
        OverlayImageContainerComponent,
        SearchFieldComponent,
        CardJobAdsComponent,
        AngularSvgIconModule,
    ],
    templateUrl: './job-ads.component.html',
    styleUrls: ['./job-ads.component.scss'],
    providers: [JobAdsService],
})
export class JobAdsComponent implements OnInit {
    overlayImage = OVERLAY_IMAGES.jobs;

    jobAds!: JobAds[];
    isBookmark!: boolean;

    constructor(
        private readonly router: Router,
        private readonly destroyRef: DestroyRef,
        private readonly jobAdsService: JobAdsService,
        private readonly localStorageService: LocalStorageService,
        private readonly toastService: ToastService,
    ) {}

    ngOnInit(): void {
        this.findAll();
    }

    findAll(): void {
        this.jobAdsService
            .findAll()
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

    onBookmark(): void {
        this.isBookmark = !this.isBookmark;
        console.log(this.isBookmark);

        this.localStorageService.removeItem('bookmark');
        this.localStorageService.setItem('bookmark', this.isBookmark);
    }

    search(query: string) {
        if (query?.trim()) {
            this.router.navigate(['/jobs/search-result'], { queryParams: { query: query } });
        }
    }
}
