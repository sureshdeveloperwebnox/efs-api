export interface ICreateCrew {
  organization_id: Number;
  name: string;
  leader_id: Number;
  date_time: string;
}

export class CreateCrew implements ICreateCrew {
  organization_id: Number;
  name: string;
  leader_id: Number;
  date_time: string;

  constructor(data: ICreateCrew) {
    this.organization_id = data.organization_id;
    this.name = data.name;
    this.leader_id = data.leader_id;
    this.date_time = data.date_time;
  }
}
