import { Frequency, FrequencyUnitType } from "./main.model";

// Create Maintenance Model
export interface ICreateMaintenancePlan {
  organization_id: bigint;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  frequency: Frequency;
  frequency_unit: number;
  frequency_unit_type: FrequencyUnitType;
  is_active: number;
  date_time: string;
}

export class CreateMaintenancePlan implements ICreateMaintenancePlan {
  organization_id: bigint;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  frequency: Frequency;
  frequency_unit: number;
  frequency_unit_type: FrequencyUnitType;
  is_active: number;
  date_time: string;

  constructor(data: ICreateMaintenancePlan) {
    this.organization_id = data.organization_id;
    this.name = data.name;
    this.description = data.description;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.frequency = data.frequency;
    this.frequency_unit = data.frequency_unit;
    this.frequency_unit_type = data.frequency_unit_type;
    this.is_active = data.is_active;
    this.date_time = data.date_time;
  }
}

// Update Maintenance Model
export interface IUpdateMaintenancePlan {
  id: bigint;
  organization_id: bigint;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  frequency: Frequency;
  frequency_unit: number;
  frequency_unit_type: FrequencyUnitType;
  is_active: number;
  date_time: string;
}

export class UpdateMaintenancePlan implements IUpdateMaintenancePlan {
  id: bigint;
  organization_id: bigint;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  frequency: Frequency;
  frequency_unit: number;
  frequency_unit_type: FrequencyUnitType;
  is_active: number;
  date_time: string;

  constructor(data: IUpdateMaintenancePlan) {
    this.id = data.id;
    this.organization_id = data.organization_id;
    this.name = data.name;
    this.description = data.description;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.frequency = data.frequency;
    this.frequency_unit = data.frequency_unit;
    this.frequency_unit_type = data.frequency_unit_type;
    this.is_active = data.is_active;
    this.date_time = data.date_time;
  }
}
