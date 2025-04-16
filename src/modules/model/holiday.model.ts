export interface IHoliday {
  organization_id: Number;
  name: string;
  holiday_date: string;
  is_recurring: Number;
  created_at: string;
}

export class Holiday implements IHoliday {
  organization_id: Number;
  name: string;
  holiday_date: string;
  is_recurring: Number;
  created_at: string;
  constructor(data: IHoliday) {
    this.name = data.name;
    this.organization_id = data.organization_id;
    this.holiday_date = data.holiday_date;
    this.is_recurring = data.is_recurring;
    this.created_at = data.created_at;
  }
}
