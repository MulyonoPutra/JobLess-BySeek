import { Application } from './application';
import { Education } from './education';
import { Experience } from './experience';
import { SavedJobs } from './saved-jobs';
import { Skill } from './skill';
import { User } from './user';

export interface Seeker {
    id: string;
    birthday: string;
    summary: string;
    education: Education[];
    experience: Experience[];
    skills: Skill[];
    user: User;
    savedJobs: SavedJobs[];
    application: Application[];
}
