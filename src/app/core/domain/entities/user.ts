import { Seeker } from './seeker';

export interface User {
	id: string;
	name: string;
	email: string;
	avatar: any;
	phone: any;
	role: string;
	seeker?: Seeker;
}
