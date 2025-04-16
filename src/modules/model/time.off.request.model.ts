export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DENIED = "DENIED",
}

export interface ITimeOffRequest {
  user_id: Number;
  name: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: RequestStatus;
  created_at: string;
}

export class TimeOffRequest implements ITimeOffRequest {
  user_id: Number;
  name: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: RequestStatus;
  created_at: string;
  constructor(data: ITimeOffRequest) {
    this.name = data.name;
    this.user_id = data.user_id;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.reason = data.reason;
    this.status = data.status;
    this.created_at = data.created_at;
  }
}


export interface IUpdateTimeOffRequest {
  id: Number;
  status: RequestStatus;
  updated_at: string;
}

export class UpdateTimeOffRequest implements IUpdateTimeOffRequest {
  id: Number;
  status: RequestStatus;
  updated_at: string;
  constructor(data: IUpdateTimeOffRequest) {
    this.id = data.id;
    this.status = data.status;
    this.updated_at = data.updated_at;
  }
}