
// Create Service Validation
export interface ICreateService {
  organization_id: bigint;
  name: string;
  description: string;
  duration: number;
  price: number;
  required_skills: JSON;
}

export class CreateService implements ICreateService {
  organization_id: bigint;
  name: string;
  description: string;
  duration: number;
  price: number;
  required_skills: JSON;

  constructor(data: ICreateService) {
    this.organization_id = data.organization_id;
    this.name = data.name;
    this.description = data.description;
    this.duration = data.duration;
    this.price = data.price;
    this.required_skills = data.required_skills;
  }
}


// Update Service Validation
export interface IUpdateService {
  id: bigint;
  name: string;
  organization_id: bigint;
  description: string;
  duration: number;
  price: number;
  required_skills: JSON;
  date: string;
}

export class UpdateService implements IUpdateService {
  id: bigint;
  name: string;
  organization_id: bigint;
  description: string;
  duration: number;
  price: number;
  required_skills: JSON;
  date: string;

  constructor(data: IUpdateService) {
    this.id = data.id;
    this.name = data.name;
    this.organization_id = data.organization_id;
    this.description = data.description;
    this.duration = data.duration;
    this.price = data.price;
    this.required_skills = data.required_skills;
    this.date = data.date;
  }
}
