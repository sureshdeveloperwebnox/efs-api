export interface ICreateCrew {
  organization_id: Number;
  name: string;
  leader_id: Number;
  created_at: string;
}

export class CreateCrew implements ICreateCrew {
  organization_id: Number;
  name: string;
  leader_id: Number;
  created_at: string;

  constructor(data: ICreateCrew) {
    this.organization_id = data.organization_id;
    this.name = data.name;
    this.leader_id = data.leader_id;
    this.created_at = data.created_at;
  }
}
