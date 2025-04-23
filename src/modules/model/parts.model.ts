// Create Part Model

export interface ICreatePart {
  organization_id: bigint;
  name: string;
  description: string;
  price: number;
  inventory_count: number;
  reorder_level: number;
  date_time: string;
}

export class CreatePart implements ICreatePart {
  organization_id: bigint;
  name: string;
  description: string;
  price: number;
  inventory_count: number;
  reorder_level: number;
  date_time: string;

  constructor(data: ICreatePart) {
    this.organization_id = data.organization_id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.inventory_count = data.inventory_count;
    this.reorder_level = data.reorder_level;
    this.date_time = data.date_time;
  }
}

// Update Part Model

export interface IUpdatePart {
  id: bigint;
  organization_id: bigint;
  name: string;
  description: string;
  price: number;
  inventory_count: number;
  reorder_level: number;
  date_time: string;
}

export class UpdatePart implements IUpdatePart {
  id: bigint;
  organization_id: bigint;
  name: string;
  description: string;
  price: number;
  inventory_count: number;
  reorder_level: number;
  date_time: string;

  constructor(data: IUpdatePart) {
    this.id = data.id;
    this.organization_id = data.organization_id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.inventory_count = data.inventory_count;
    this.reorder_level = data.reorder_level;
    this.date_time = data.date_time;
  }
}
