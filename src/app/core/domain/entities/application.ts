import { JobAds } from './job-ads';

export interface Application {
	id: string;
	status: string;
	date: string;
	jobAds: JobAds;
}
