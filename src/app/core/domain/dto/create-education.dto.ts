import { Education } from "../entities/education";

export interface EducationDto extends Education {
  seekerId?: string;
}
