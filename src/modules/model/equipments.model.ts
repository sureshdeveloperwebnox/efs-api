import { EquipmentStatus } from './main.model';

// Create Equipment Model
export interface ICreateEquipmentModel {
  organization_id: bigint;
  name: string;
  equipment_type: string;
  status: EquipmentStatus;
  location: string;
  availability_date: string;
  date_time: string;
}


export class CreateEquipmentModel implements ICreateEquipmentModel {
  organization_id: bigint;
  name: string;
  equipment_type: string;
  status: EquipmentStatus;
  location: string;
  availability_date: string;
  date_time: string;

  constructor (data: ICreateEquipmentModel) {
    this.organization_id = data.organization_id;
    this.name = data.name;
    this.equipment_type = data.equipment_type;
    this.status = data.status
    this.location = data.location;
    this.availability_date = data.availability_date;
    this.date_time = data.date_time;
  }
}


// Update Equipment Model
export interface IUpdateEquipmentModel {
  id: bigint;
  organization_id: bigint;
  name: string;
  equipment_type: string;
  status: EquipmentStatus;
  location: string;
  availability_date: string;
  date_time: string;
}


export class UpdateEquipmentModel implements IUpdateEquipmentModel {
  id: bigint;
  organization_id: bigint;
  name: string;
  equipment_type: string;
  status: EquipmentStatus;
  location: string;
  availability_date: string;
  date_time: string;

  constructor (data: IUpdateEquipmentModel) {
    this.id = data.id;
    this.organization_id = data.organization_id;
    this.name = data.name;
    this.equipment_type = data.equipment_type;
    this.status = data.status
    this.location = data.location;
    this.availability_date = data.availability_date;
    this.date_time = data.date_time;
  }
}