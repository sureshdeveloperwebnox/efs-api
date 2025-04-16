import { RequestStatus } from "./main.model";

// Create Time Off Request Model
export interface ICreateTimeOffRequest {
  user_id: Number;
  name: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: RequestStatus;
  created_at: string;
}

export class CreateTimeOffRequest implements ICreateTimeOffRequest {
  user_id: Number;
  name: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: RequestStatus;
  created_at: string;
  constructor(data: ICreateTimeOffRequest) {
    this.name = data.name;
    this.user_id = data.user_id;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.reason = data.reason;
    this.status = data.status;
    this.created_at = data.created_at;
  }
}


// Update (Approve or Reject) Time Off Request Model
export interface IUpdateTimeOffRequest {
  id: Number;
  status: RequestStatus;
  updated_at: string;
}

export class UpdateTimeOffRequest implements IUpdateTimeOffRequest {
  id: Number;
  status: RequestStatus;
  updated_at: string;
  constructor(data: UpdateTimeOffRequest) {
    this.id = data.id;
    this.status = data.status;
    this.updated_at = data.updated_at;
  }
}