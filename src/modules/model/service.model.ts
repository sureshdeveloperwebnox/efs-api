
// Create Service Validation
export interface ICreateService {
  organization_id: bigint;
  description: string;
  duration: number;
  price: number;
  required_skills: JSON;
}

export class CreateService implements ICreateService {
  organization_id: bigint;
  description: string;
  duration: number;
  price: number;
  required_skills: JSON;

  constructor(data: ICreateService) {
    this.organization_id = data.organization_id;
    this.description = data.description;
    this.duration = data.duration;
    this.price = data.price;
    this.required_skills = data.required_skills;
  }
}


// Update Service Validation
export interface IUpdateService {
  id: bigint;
  organization_id: bigint;
  description: string;
  duration: number;
  price: number;
  required_skills: JSON;
}

export class UpdateService implements IUpdateService {
  id: bigint;
  organization_id: bigint;
  description: string;
  duration: number;
  price: number;
  required_skills: JSON;

  constructor(data: IUpdateService) {
    this.id = data.id;
    this.organization_id = data.organization_id;
    this.description = data.description;
    this.duration = data.duration;
    this.price = data.price;
    this.required_skills = data.required_skills;
  }
}
