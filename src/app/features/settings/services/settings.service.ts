import { ChangeEmailDto } from '../../../core/domain/dto/change-email.dto';
import { ChangePasswordDto } from '../../../core/domain/dto/change-password.dto';
import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../../../core/domain/entities/http-response-entity';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    endpoint = environment.endpoint;

    constructor(private readonly http: HttpClient) {}

    changePasword(body: ChangePasswordDto): Observable<unknown> {
        return this.http.post<HttpResponseEntity<unknown>>(
            `${this.endpoint}/profile/change-password`,
            body,
        );
    }

    deleteUser(id: string): Observable<unknown> {
        return this.http.delete<HttpResponseEntity<unknown>>(`${this.endpoint}/profile/${id}`);
    }

    changeEmail(id: string, body: ChangeEmailDto): Observable<unknown> {
        return this.http.patch<HttpResponseEntity<unknown>>(`${this.endpoint}/profile/${id}`, body);
    }
}
