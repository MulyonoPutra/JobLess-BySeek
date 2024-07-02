import { Observable, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../domain/entities/http-response-entity';
import { Injectable } from '@angular/core';
import { User } from '../domain/entities/user';
import { environment } from '../../../environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	endpoint = environment.endpoint;

	constructor(private readonly http: HttpClient) {}

	findUser(): Observable<User> {
		return this.http
			.get<HttpResponseEntity<User>>(`${this.endpoint}/profile/detail`)
			.pipe(map((response) => response.data));
	}
}
