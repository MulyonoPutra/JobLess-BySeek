import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LoadingService {
	visibility: BehaviorSubject<boolean>;

	constructor() {
		this.visibility = new BehaviorSubject(false);
	}

	show() {
		this.visibility.next(true);
	}

	hide() {
		this.visibility.next(false);
	}
}
