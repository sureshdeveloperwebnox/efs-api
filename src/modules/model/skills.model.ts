export interface ISkills {
  name: string;
  description: string;
  created_at: string;
}

export class Skills implements ISkills {
  name: string;
  description: string;
  created_at: string;
  constructor(data: ISkills) {
    this.name = data.name;
    this.description = data.description;
    this.created_at = data.created_at;
  }
}

export interface ISkillsParams {
  id: string;
}

export class SkillsParams implements ISkillsParams {
  id: string;
  constructor(data: ISkillsParams) {
    this.id = data.id;
  }
}
