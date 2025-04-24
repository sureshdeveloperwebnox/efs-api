
// Create Service Type Model
export interface ICreateServiceType {
  organization_id: bigint;
  name: string;
  description: string;
  date_time: string
}

export class CreateServiceType implements ICreateServiceType {
  organization_id: bigint;
  name: string;
  description: string;
  date_time: string;
  constructor(data: ICreateServiceType) {
    this.organization_id = data.organization_id;
    this.name = data.name;
    this.description = data.description;
    this.date_time = data.date_time;
  }
}


// Update Service Model
export interface IUpdateServiceType {
    id: bigint;
    organization_id: bigint;
    name: string;
    description: string;
    date_time: string
  }
  
  export class UpdateServiceType implements IUpdateServiceType {
    id: bigint;
    organization_id: bigint;
    name: string;
    description: string;
    date_time: string;
    constructor(data: IUpdateServiceType) {
      this.id = data.id;
      this.organization_id = data.organization_id;
      this.name = data.name;
      this.description = data.description;
      this.date_time = data.date_time;
    }
  }
  