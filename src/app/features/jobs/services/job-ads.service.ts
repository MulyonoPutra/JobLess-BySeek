import { Observable, map } from 'rxjs';

import { CreateApplicationDto } from '../../../core/domain/dto/create-application.dto';
import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../../../core/domain/entities/http-response-entity';
import { Injectable } from '@angular/core';
import { JobAds } from '../../../core/domain/entities/job-ads';
import { SavedJobAdsDto } from '../../../core/domain/dto/saved-job-ads.dto';
import { environment } from '../../../../environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class JobAdsService {
	endpoint = environment.endpoint;

	constructor(private readonly http: HttpClient) {}

	findAll(): Observable<JobAds[]> {
		return this.http
			.get<HttpResponseEntity<JobAds[]>>(`${this.endpoint}/job-ads`)
			.pipe(map((response) => response.data));
	}

	findById(id: string): Observable<JobAds> {
		return this.http
			.get<HttpResponseEntity<JobAds>>(`${this.endpoint}/job-ads/${id}`)
			.pipe(map((response) => response.data));
	}

	savedJobAds(body: SavedJobAdsDto): Observable<any> {
		return this.http
			.post(`${this.endpoint}/seeker/saved-jobs`, body)
			.pipe(map((response) => response));
	}

	appliedJobs(body: CreateApplicationDto): Observable<unknown> {
		return this.http
			.post(`${this.endpoint}/seeker/application`, body)
			.pipe(map((response) => response));
	}
}
