import { Observable, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../../../core/domain/entities/http-response-entity';
import { Injectable } from '@angular/core';
import { Seeker } from '../../../core/domain/entities/seeker';
import { UpdateSummaryDto } from '../../../core/domain/dto/update-summary.dto';
import { UpdateSummaryResponseEntity } from '../../../core/domain/entities/update-summary.response-entity';
import { environment } from '../../../../environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	endpoint = environment.endpoint;

	constructor(private readonly http: HttpClient) {}

	findOne(id: string): Observable<Seeker> {
		return this.http
			.get<HttpResponseEntity<Seeker>>(`${this.endpoint}/seeker/${id}`)
			.pipe(map((response) => response.data));
	}

  updateSummary(id: string, body: UpdateSummaryDto): Observable<UpdateSummaryResponseEntity> {
    return this.http
      .patch<HttpResponseEntity<UpdateSummaryResponseEntity>>(`${this.endpoint}/seeker/${id}`, body)
      .pipe(map((response) => response.data));
  }
}
