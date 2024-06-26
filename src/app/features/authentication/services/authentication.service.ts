import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

import { Credentials } from '../domain/entities/credentials';
import { HttpResponseEntity } from '../../../core/domain/http-response-entity';
import { Injectable } from '@angular/core';
import { JWTDecoded } from '../../../core/domain/entities/jwt-decoded';
import { LoginDto } from '../domain/dto/login.dto';
import { RegisterDto } from '../domain/dto/register.dto';
import { StorageService } from '../../../core/services/storage.service';
import { environment } from '../../../../environments/environment.development';
import { handlerHttpError } from '../../../core/utility/http-handle-error';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  endpoint = environment.endpoint;

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
  ) { }

  login(body: LoginDto): Observable<HttpResponseEntity<Credentials>> {
    return this.http
      .post<HttpResponseEntity<Credentials>>(`${this.endpoint}/auth/login`, body)
      .pipe(
        map((response) => {
          this.storageService.setAccessToken(response.data.accessToken);
          this.storageService.setRefreshToken(response.data.refreshToken);

          const decoded = jwtDecode<JWTDecoded>(response.data.accessToken);

          this.storageService.setRole(decoded.role);

          return response;
        }),
        catchError((error: HttpErrorResponse) => handlerHttpError(error)),
      );
  }

  register(body: RegisterDto): Observable<HttpResponseEntity<Credentials>> {
    return this.http.post<HttpResponseEntity<Credentials>>(
      `${this.endpoint}/auth/register`,
      body,
    );
  }

  logout(accessToken: string): Observable<any> {
    const endpoint = `${this.endpoint}/auth/logout`;
    if (!accessToken) {
      return throwError(() => console.error('Access token not found!'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post(endpoint, {}, { headers: headers }).pipe(
      map(() => this.storageService.clear()),
      catchError((error: HttpErrorResponse) => handlerHttpError(error)),
    );
  }

  generateRefreshToken(refreshToken: string): Observable<HttpResponseEntity<Credentials>> {
    if (!refreshToken) {
      return throwError(() => console.error('Refresh token not found!'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${refreshToken}`);
    return this.http.post<HttpResponseEntity<Credentials>>(
      `${this.endpoint}/auth/refresh`,
      {},
      { headers: headers },
    );
  }
}
