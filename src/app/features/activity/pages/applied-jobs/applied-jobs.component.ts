import { CommonModule } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StorageService } from '../../../../core/services/storage.service';
import { ActivityService } from '../../services/activity.service';
import { Application } from '../../../../core/domain/entities/application';
import { CardApplicationComponent } from '../../../../shared/components/molecules/card-application/card-application.component';
import { EmptyStateComponent } from '../../../../shared/components/atoms/empty-state/empty-state.component';

@Component({
    selector: 'app-applied-jobs',
    standalone: true,
    imports: [CommonModule, CardApplicationComponent, EmptyStateComponent],
    templateUrl: './applied-jobs.component.html',
    styleUrls: ['./applied-jobs.component.scss'],
    providers: [ActivityService],
})
export class AppliedJobsComponent implements OnInit {
    isLoading = false;
    applications!: Application[];

    constructor(
        private readonly destroyRef: DestroyRef,
        private readonly activityService: ActivityService,
        private readonly storageService: StorageService,
    ) {}

    ngOnInit(): void {
        this.findOne();
    }

    findOne(): void {
        const seekerId = this.storageService.getSeekerIdentity();
        this.activityService
            .findApplicationBySeekerId(seekerId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (response: Application[]) => {
                    this.applications = response;
                },
                error: (error: HttpErrorResponse) => {
                    console.error(error);
                },
            });
    }

    applied(): void {
        setTimeout(() => {
            this.isLoading = false;
        }, 3000);
        this.isLoading = true;
    }

    onRemove(): void {
        console.log('removed');
    }
}
