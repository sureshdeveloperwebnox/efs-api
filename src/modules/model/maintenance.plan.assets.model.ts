// Create Maintenance Plan Asset Model
export interface ICreateMaintenancePlanAsset {
  maintenance_plan_id: bigint;
  asset_id: bigint;
  assigned_at: string;
  date_time: string;
}

export class CreateMaintenancePlanAsset implements ICreateMaintenancePlanAsset {
  maintenance_plan_id: bigint;
  asset_id: bigint;
  assigned_at: string;
  date_time: string;

  constructor(data: ICreateMaintenancePlanAsset) {
    this.maintenance_plan_id = data.maintenance_plan_id;
    this.asset_id = data.asset_id;
    this.assigned_at = data.assigned_at;
    this.date_time = data.date_time;
  }
}

// Update Maintenance Plan Asset Model
export interface IUpdateMaintenancePlanAsset {
    id: bigint;
    maintenance_plan_id: bigint;
    asset_id: bigint;
    assigned_at: string;
    date_time: string;
  }
  
  export class UpdateMaintenancePlanAsset implements IUpdateMaintenancePlanAsset {
    id: bigint;
    maintenance_plan_id: bigint;
    asset_id: bigint;
    assigned_at: string;
    date_time: string;
  
    constructor(data: IUpdateMaintenancePlanAsset) {
      this.id = data.id;
      this.maintenance_plan_id = data.maintenance_plan_id;
      this.asset_id = data.asset_id;
      this.assigned_at = data.assigned_at;
      this.date_time = data.date_time;
    }
  }