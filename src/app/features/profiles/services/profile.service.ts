import { Observable, map } from 'rxjs';

import { CreateSkillDto } from '../../../core/domain/dto/create-skill.dto';
import { CreateSummaryDto } from '../../../core/domain/dto/create-summary.dto';
import { CreateWorkHistoryDto } from '../../../core/domain/dto/create-work-history.dto';
import { Education } from '../../../core/domain/entities/education';
import { EducationDto } from '../../../core/domain/dto/create-education.dto';
import { Experience } from '../../../core/domain/entities/experience';
import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../../../core/domain/entities/http-response-entity';
import { Injectable } from '@angular/core';
import { ProfileResponseEntity } from '../../../core/domain/entities/profile.response-entity';
import { Seeker } from '../../../core/domain/entities/seeker';
import { Skill } from '../../../core/domain/entities/skill';
import { UpdateEducationDto } from '../../../core/domain/dto/update-education.dto';
import { UpdateProfileDto } from '../../../core/domain/dto/update-profile.dto';
import { UpdateSummaryDto } from '../../../core/domain/dto/update-summary.dto';
import { UpdateSummaryResponseEntity } from '../../../core/domain/entities/update-summary.response-entity';
import { WorkHistoryDto } from '../../../core/domain/dto/work-history.dto';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    endpoint = environment.endpoint;

    constructor(private readonly http: HttpClient) {}

    updateProfile(id: string, body: UpdateProfileDto): Observable<ProfileResponseEntity> {
        return this.http
            .patch<
                HttpResponseEntity<ProfileResponseEntity>
            >(`${this.endpoint}/profile/${id}`, body)
            .pipe(map((response) => response.data));
    }

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

    createSummary(body: CreateSummaryDto): Observable<unknown> {
        return this.http
            .post<HttpResponseEntity<unknown>>(`${this.endpoint}/seeker`, body)
            .pipe(map((response) => response.data));
    }

    updateSummary(id: string, body: UpdateSummaryDto): Observable<UpdateSummaryResponseEntity> {
        return this.http
            .patch<
                HttpResponseEntity<UpdateSummaryResponseEntity>
            >(`${this.endpoint}/seeker/${id}`, body)
            .pipe(map((response) => response.data));
    }

    updateWorkHistory(id: string, body: WorkHistoryDto): Observable<Experience> {
        return this.http
            .patch<HttpResponseEntity<Experience>>(`${this.endpoint}/seeker/experience/${id}`, body)
            .pipe(map((response) => response.data));
    }

    createWorkHistory(seekerId: string, body: CreateWorkHistoryDto[]): Observable<unknown> {
        return this.http
            .post<
                HttpResponseEntity<unknown>
            >(`${this.endpoint}/seeker/experience/${seekerId}`, body)
            .pipe(map((response) => response.data));
    }

    removeExperienceById(id: string): Observable<Experience> {
        return this.http
            .delete<HttpResponseEntity<Experience>>(`${this.endpoint}/seeker/experience/${id}`)
            .pipe(map((response) => response.data));
    }

    findEducationById(id: string): Observable<Education> {
        return this.http
            .get<HttpResponseEntity<Education>>(`${this.endpoint}/seeker/education/${id}`)
            .pipe(map((response) => response.data));
    }

    removeEducationById(id: string): Observable<Education> {
        return this.http
            .delete<HttpResponseEntity<Education>>(`${this.endpoint}/seeker/education/${id}`)
            .pipe(map((response) => response.data));
    }

    createEducation(seekerId: string, body: EducationDto[]): Observable<unknown> {
        return this.http
            .post<
                HttpResponseEntity<unknown>
            >(`${this.endpoint}/seeker/education/${seekerId}`, body)
            .pipe(map((response) => response.data));
    }

    updateEducation(id: string, body: UpdateEducationDto): Observable<Education> {
        return this.http
            .patch<HttpResponseEntity<Education>>(`${this.endpoint}/seeker/education/${id}`, body)
            .pipe(map((response) => response.data));
    }

    findSkillsBySeekerId(id: string): Observable<Skill[]> {
        return this.http
            .get<HttpResponseEntity<Skill[]>>(`${this.endpoint}/seeker/skills/${id}`)
            .pipe(map((response) => response.data));
    }

    createSkills(seekerId: string, body: CreateSkillDto[]): Observable<unknown> {
        return this.http
            .post<HttpResponseEntity<unknown>>(`${this.endpoint}/seeker/skills/${seekerId}`, body)
            .pipe(map((response) => response.data));
    }

    removeSkillById(id: string): Observable<Skill> {
        return this.http
            .delete<HttpResponseEntity<Skill>>(`${this.endpoint}/seeker/skills/${id}`)
            .pipe(map((response) => response.data));
    }
}
