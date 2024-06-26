import { CommonModule, Location } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { JobAdsService } from '../../services/job-ads.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JobAds } from '../../domain/entities/job-ads';
import { HttpErrorResponse } from '@angular/common/http';
import { RupiahPipe } from '../../../../shared/pipes/rupiah.pipe';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

@Component({
	selector: 'app-job-details',
	standalone: true,
  imports: [CommonModule, AngularSvgIconModule, TimeAgoPipe, RupiahPipe],
	templateUrl: './job-details.component.html',
	styleUrls: ['./job-details.component.scss'],
  providers: [JobAdsService]
})
export class JobDetailsComponent implements OnInit {

  jobId!: string;
  jobAds!: JobAds;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly destroyRef: DestroyRef,
    private readonly location: Location,
    private readonly jobAdsService: JobAdsService
  ) {
    this.jobId = this.route.snapshot.paramMap.get('id')!;
  }

	ngOnInit(): void {
    this.findById()
  }

  findById(): void {
    this.jobAdsService.findById(this.jobId).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (response: JobAds) => {
        this.jobAds = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
      complete: () => { },
    });
  }

}
