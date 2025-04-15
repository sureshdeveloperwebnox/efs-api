export enum ProficiencyLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "BEGINNER",
  EXPERT = "EXPERT",
}

export interface IUserSkills {
  user_id: Number,
  skill_id: Number,
  organization_id: Number,
  proficiency_level: ProficiencyLevel,
  created_at: string;
  }
  
  export class UserSkills implements IUserSkills {
    user_id: Number;
    skill_id: Number;
    organization_id: Number;
    proficiency_level: ProficiencyLevel;
    created_at: string;

    constructor(data: IUserSkills) {
     this.user_id = data.user_id;
     this.skill_id= data.skill_id;
     this.organization_id = data.organization_id;
     this.proficiency_level = data.proficiency_level;
     this.created_at= data.created_at;
    }
  }