import { Company } from './company';
import { JobAds } from './job-ads';

export interface Employer {
    id?: string;
    accountName?: string;
    company?: Company;
    jobAds?: JobAds[];
}
