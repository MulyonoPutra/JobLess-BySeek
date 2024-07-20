import { Observable, map } from 'rxjs';

import { Company } from '../../../core/domain/entities/company';
import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../../../core/domain/entities/http-response-entity';
import { Injectable } from '@angular/core';
import { JobAds } from '../../../core/domain/entities/job-ads';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class CompanyService {
    endpoint = environment.endpoint;

    constructor(private readonly http: HttpClient) {}

    findAll(): Observable<Company[]> {
        return this.http
            .get<HttpResponseEntity<Company[]>>(`${this.endpoint}/company`)
            .pipe(map((response) => response.data));
    }

    findById(id: string): Observable<Company> {
        return this.http
            .get<HttpResponseEntity<Company>>(`${this.endpoint}/company/${id}`)
            .pipe(map((response) => response.data));
    }

    findJobAdsByCompanyId(id: string): Observable<JobAds[]> {
        return this.http
            .get<HttpResponseEntity<JobAds[]>>(`${this.endpoint}/company/jobs/${id}`)
            .pipe(map((response) => response.data));
    }
}
