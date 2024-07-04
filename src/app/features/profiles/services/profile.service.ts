import { Observable, map } from 'rxjs';

import { Education } from '../../../core/domain/entities/education';
import { Experience } from '../../../core/domain/entities/experience';
import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../../../core/domain/entities/http-response-entity';
import { Injectable } from '@angular/core';
import { Seeker } from '../../../core/domain/entities/seeker';
import { UpdateEducationDto } from '../../../core/domain/dto/update-education.dto';
import { UpdateSummaryDto } from '../../../core/domain/dto/update-summary.dto';
import { UpdateSummaryResponseEntity } from '../../../core/domain/entities/update-summary.response-entity';
import { WorkHistoryDto } from '../../../core/domain/dto/work-history.dto';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  endpoint = environment.endpoint;

  constructor(private readonly http: HttpClient) { }

  findOne(id: string): Observable<Seeker> {
    return this.http
      .get<HttpResponseEntity<Seeker>>(`${this.endpoint}/seeker/${id}`)
      .pipe(map((response) => response.data));
  }

  findExperienceById(id: string): Observable<Experience> {
    return this.http
      .get<HttpResponseEntity<Experience>>(`${this.endpoint}/seeker/experience/${id}`)
      .pipe(map((response) => response.data));
  }

  updateSummary(id: string, body: UpdateSummaryDto): Observable<UpdateSummaryResponseEntity> {
    return this.http
      .patch<HttpResponseEntity<UpdateSummaryResponseEntity>>(`${this.endpoint}/seeker/${id}`, body)
      .pipe(map((response) => response.data));
  }

  updateWorkHistory(id: string, body: WorkHistoryDto): Observable<Experience> {
    return this.http
      .patch<HttpResponseEntity<Experience>>(`${this.endpoint}/seeker/experience/${id}`, body)
      .pipe(map((response) => response.data));
  }

  updateEducation(id: string, body: UpdateEducationDto): Observable<Education> {
    return this.http
      .patch<HttpResponseEntity<Education>>(`${this.endpoint}/seeker/education/${id}`, body)
      .pipe(map((response) => response.data));
  }
}
