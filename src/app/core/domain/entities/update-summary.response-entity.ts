import { User } from './user';

export interface UpdateSummaryResponseEntity {
    id: string;
    summary: string;
    user: User;
}
