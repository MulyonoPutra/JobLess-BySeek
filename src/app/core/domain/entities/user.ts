import { Seeker } from './seeker';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    phone: string;
    role: string;
    seeker?: Seeker;
}
