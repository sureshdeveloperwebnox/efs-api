export enum DayOfWeek {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}

export interface IBusinessHoursModel {
  organization_id: Number;
  day_of_week: DayOfWeek;
  start_time: string;
  end_time: string;
  created_at: string;
}

export class BusinessHoursModel implements IBusinessHoursModel {
  organization_id: Number;
  day_of_week: DayOfWeek;
  start_time: string;
  end_time: string;
  created_at: string;
  constructor(data: IBusinessHoursModel) {
    this.organization_id = data.organization_id;
    this.day_of_week = data.day_of_week;
    this.start_time = data.start_time;
    this.end_time = data.end_time;
    this.created_at = data.created_at;
  }
}
