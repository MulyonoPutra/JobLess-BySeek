import { Observable, map } from 'rxjs';

import { Application } from '../../../core/domain/entities/application';
import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../../../core/domain/entities/http-response-entity';
import { Injectable } from '@angular/core';
import { JobAds } from '../../../core/domain/entities/job-ads';
import { environment } from '../../../../environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class ActivityService {
	endpoint = environment.endpoint;

	constructor(private readonly http: HttpClient) {}

	findSavedJobsBySeekerId(id: string): Observable<JobAds[]> {
		return this.http
			.get<HttpResponseEntity<JobAds[]>>(`${this.endpoint}/seeker/saved-jobs/${id}`)
			.pipe(map((response) => response.data));
	}

	findApplicationBySeekerId(id: string): Observable<Application[]> {
		return this.http
			.get<HttpResponseEntity<Application[]>>(`${this.endpoint}/seeker/application/${id}`)
			.pipe(map((response) => response.data));
	}
}
