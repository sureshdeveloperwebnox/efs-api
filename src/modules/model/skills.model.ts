// Skills Model

// Create Skills Model
export interface ICreateSkills {
  name: string;
  description: string;
  created_at: string;
}
export class CreateSkills implements ICreateSkills {
  name: string;
  description: string;
  created_at: string;
  constructor(data: ICreateSkills) {
    this.name = data.name;
    this.description = data.description;
    this.created_at = data.created_at;
  }
}

