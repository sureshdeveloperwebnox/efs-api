import { ApprovalStatus } from "./main.model";

// Create Work Order Approval
export interface ICreateWorkOrderApprovalModel {
  work_order_id: bigint;
  approved_by: bigint;
  approval_status: ApprovalStatus;
  date_time: string;
}

export class CreateWorkOrderApprovalModel implements ICreateWorkOrderApprovalModel {
  work_order_id: bigint;
  approved_by: bigint;
  approval_status: ApprovalStatus;
  date_time: string;

  constructor(data: ICreateWorkOrderApprovalModel) {
    this.work_order_id = data.work_order_id;
    this.approved_by = data.approved_by;
    this.approval_status = data.approval_status;
    this.date_time = data.date_time;
  }
}

// Update Work Order Approval
export interface IUpdateWorkOrderApprovalModel {
  id: bigint;
  work_order_id: bigint;
  approved_by: bigint;
  approval_status: ApprovalStatus;
  approved_at: string;
  date_time: string;
}

export class UpdateWorkOrderApprovalModel implements IUpdateWorkOrderApprovalModel {
  id: bigint;
  work_order_id: bigint;
  approved_by: bigint;
  approval_status: ApprovalStatus;
  approved_at: string;
  date_time: string;

  constructor(data: IUpdateWorkOrderApprovalModel) {
    this.id = data.id;
    this.work_order_id = data.work_order_id;
    this.approved_by = data.approved_by;
    this.approval_status = data.approval_status;
    this.approved_at = data.approved_at;
    this.date_time = data.date_time;
  }
}


// Work Order Approval
export interface IWorkOrderApprovalModel {
  id: bigint;
  work_order_id: bigint;
  user_id: bigint;
  approval_status: ApprovalStatus;
  date_time: string;
}

export class WorkOrderApprovalModel implements IWorkOrderApprovalModel {
  id: bigint;
  work_order_id: bigint;
  user_id: bigint;
  approval_status: ApprovalStatus;
  date_time: string;

  constructor(data: IWorkOrderApprovalModel) {
    this.id = data.id;
    this.work_order_id = data.work_order_id;
    this.user_id = data.user_id;
    this.approval_status = data.approval_status;
    this.date_time = data.date_time;
  }
}

