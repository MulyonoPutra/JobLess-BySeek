import { CommonModule } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../../core/services/storage.service';
import { Company } from '../../../../core/domain/entities/company';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-company-overview',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './company-overview.component.html',
    styleUrls: ['./company-overview.component.scss'],
    providers: [CompanyService],
})
export class CompanyOverviewComponent implements OnInit {
    company!: Company;
    companyId!: string;
    visible = false;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly destroyRef: DestroyRef,
    ) {}

    ngOnInit(): void {
        this.route.parent?.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (response) => {
                this.company = response['data'];
            },
        });
    }
}
