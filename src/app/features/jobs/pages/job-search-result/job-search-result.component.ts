import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CardJobAdsComponent } from '../../../../shared/components/molecules/card-job-ads/card-job-ads.component';
import { CommonModule } from '@angular/common';
import { OverlayImageContainerComponent } from '../../../../shared/components/molecules/overlay-image-container/overlay-image-container.component';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobSearchResultComponent {}
