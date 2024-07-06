import { WorkHistoryDto } from './work-history.dto';

export interface CreateWorkHistoryDto extends WorkHistoryDto {
	seekerId: string;
}
