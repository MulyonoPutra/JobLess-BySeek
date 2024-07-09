import { Skill } from '../entities/skill';

export interface CreateSkillDto extends Skill {
	seekerId?: string;
}
