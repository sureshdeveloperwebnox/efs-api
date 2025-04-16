import { ProficiencyLevel } from "./main.model";

// Create User Skills Model
export interface ICreateUserSkills {
  user_id: Number;
  skill_id: Number;
  organization_id: Number;
  proficiency_level: ProficiencyLevel;
  created_at: string;
}
export class CreateUserSkills implements ICreateUserSkills {
  user_id: Number;
  skill_id: Number;
  organization_id: Number;
  proficiency_level: ProficiencyLevel;
  created_at: string;

  constructor(data: ICreateUserSkills) {
    this.user_id = data.user_id;
    this.skill_id = data.skill_id;
    this.organization_id = data.organization_id;
    this.proficiency_level = data.proficiency_level;
    this.created_at = data.created_at;
  }
}
