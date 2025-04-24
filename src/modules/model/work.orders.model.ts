import { Prioirty, WorkOrderStatus } from "./main.model";

// Create Work Order Model
export interface ICreateWorkOrder {
  organization_id: bigint;
  customer_id: bigint;
  company_id: bigint;
  asset_id: bigint;
  maintenance_plan_id: bigint;
  title: string;
  description: string;
  priority: Prioirty;
  status: WorkOrderStatus;
  assigned_to: bigint;
  assigned_crew_id: number;
  scheduled_start_date: string;
  scheduled_end_date: string;
  actual_start_date: string;
  actual_end_date: string;
  currency_id: number;
  estimated_cost: number;
  actual_cost: number;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_multi_day: number;
  date_time: string;
}

export class CreateWorkOrder implements ICreateWorkOrder {
  organization_id: bigint;
  customer_id: bigint;
  company_id: bigint;
  asset_id: bigint;
  maintenance_plan_id: bigint;
  title: string;
  description: string;
  priority: Prioirty;
  status: WorkOrderStatus;
  assigned_to: bigint;
  assigned_crew_id: number;
  scheduled_start_date: string;
  scheduled_end_date: string;
  actual_start_date: string;
  actual_end_date: string;
  currency_id: number;
  estimated_cost: number;
  actual_cost: number;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_multi_day: number;
  date_time: string;

  constructor(data: ICreateWorkOrder) {
    this.organization_id = data.organization_id;
    this.customer_id = data.customer_id;
    this.company_id = data.company_id;
    this.asset_id = data.asset_id;
    this.maintenance_plan_id = data.maintenance_plan_id;
    this.title = data.title;
    this.description = data.description;
    this.priority = data.priority;
    this.status = data.status;
    this.assigned_to = data.assigned_to;
    this.assigned_crew_id = data.assigned_crew_id;
    this.scheduled_start_date = data.scheduled_start_date;
    this.scheduled_end_date = data.scheduled_end_date;
    this.actual_start_date = data.actual_start_date;
    this.actual_end_date = data.actual_end_date;
    this.currency_id = data.currency_id;
    this.estimated_cost = data.estimated_cost;
    this.actual_cost = data.actual_cost;
    this.address = data.address;
    this.city = data.city;
    this.state = data.state;
    this.postal_code = data.postal_code;
    this.country = data.country;
    this.is_multi_day = data.is_multi_day;
    this.date_time = data.date_time;
  }
}

// Update Work Order Model
export interface IUpdateWorkOrder {
  id: bigint;
  organization_id: bigint;
  customer_id: bigint;
  company_id: bigint;
  asset_id: bigint;
  maintenance_plan_id: bigint;
  title: string;
  description: string;
  priority: Prioirty;
  status: WorkOrderStatus;
  assigned_to: bigint;
  assigned_crew_id: number;
  scheduled_start_date: string;
  scheduled_end_date: string;
  actual_start_date: string;
  actual_end_date: string;
  currency_id: number;
  estimated_cost: number;
  actual_cost: number;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_multi_day: number;
  date_time: string;
}

export class UpdateWorkOrder implements IUpdateWorkOrder {
  id: bigint;
  organization_id: bigint;
  customer_id: bigint;
  company_id: bigint;
  asset_id: bigint;
  maintenance_plan_id: bigint;
  title: string;
  description: string;
  priority: Prioirty;
  status: WorkOrderStatus;
  assigned_to: bigint;
  assigned_crew_id: number;
  scheduled_start_date: string;
  scheduled_end_date: string;
  actual_start_date: string;
  actual_end_date: string;
  currency_id: number;
  estimated_cost: number;
  actual_cost: number;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_multi_day: number;
  date_time: string;

  constructor(data: IUpdateWorkOrder) {
    this.id = data.id;
    this.organization_id = data.organization_id;
    this.customer_id = data.customer_id;
    this.company_id = data.company_id;
    this.asset_id = data.asset_id;
    this.maintenance_plan_id = data.maintenance_plan_id;
    this.title = data.title;
    this.description = data.description;
    this.priority = data.priority;
    this.status = data.status;
    this.assigned_to = data.assigned_to;
    this.assigned_crew_id = data.assigned_crew_id;
    this.scheduled_start_date = data.scheduled_start_date;
    this.scheduled_end_date = data.scheduled_end_date;
    this.actual_start_date = data.actual_start_date;
    this.actual_end_date = data.actual_end_date;
    this.currency_id = data.currency_id;
    this.estimated_cost = data.estimated_cost;
    this.actual_cost = data.actual_cost;
    this.address = data.address;
    this.city = data.city;
    this.state = data.state;
    this.postal_code = data.postal_code;
    this.country = data.country;
    this.is_multi_day = data.is_multi_day;
    this.date_time = data.date_time;
  }
}
