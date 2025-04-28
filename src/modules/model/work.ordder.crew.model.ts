// Create Work Order Crew
export interface ICreateWorkOrderCrewModel {
  work_order_id: bigint;
  crew_id: bigint;
  assigned_at: string;
  date_time: string;
}

export class CreateWorkOrderCrewModel implements ICreateWorkOrderCrewModel {
  work_order_id: bigint;
  crew_id: bigint;
  assigned_at: string;
  date_time: string;

  constructor(data: ICreateWorkOrderCrewModel) {
    this.work_order_id = data.work_order_id;
    this.crew_id = data.crew_id;
    this.assigned_at = data.assigned_at;
    this.date_time = data.date_time;
  }
}

// Update Work Order Crew
export interface IUpdateWorkOrderCrewModel {
  id: bigint;
  work_order_id: bigint;
  crew_id: bigint;
  assigned_at: string;
  date_time: string;
}

export class UpdateWorkOrderCrewModel implements IUpdateWorkOrderCrewModel {
  id: bigint;
  work_order_id: bigint;
  crew_id: bigint;
  assigned_at: string;
  date_time: string;

  constructor(data: IUpdateWorkOrderCrewModel) {
    this.id = data.id;
    this.work_order_id = data.work_order_id;
    this.crew_id = data.crew_id;
    this.assigned_at = data.assigned_at;
    this.date_time = data.date_time;
  }
}
