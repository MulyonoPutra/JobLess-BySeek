import { Address } from './address';
import { Employer } from './employer';

export interface Company {
	id: string;
	name: string;
	logo: string;
	website: string;
	industry: string;
	size: number;
	location: string;
	description: string;
	benefit: string;
	contactInfo: string;
	employerId?: string;
	address?: Address;
	employer?: Employer;
}
