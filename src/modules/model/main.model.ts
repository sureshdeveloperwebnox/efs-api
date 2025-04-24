export interface IIDModel {
  id: string;
}

export class IDModel implements IIDModel {
  id: string;
  constructor(data: IIDModel) {
    this.id = data.id;
  }
}

// Request Status ENUM
export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DENIED = "DENIED",
}

// Day Of Week ENUM
export enum DayOfWeek {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}

// Plan type ENUM
export enum PlanType {
  FREE = 'FREE',
  STANDARD = 'STANDARD',
  PROFESSIONAL = 'PROFESSIONAL'
}

// User Role ENUM
export enum UserRole {
  ADMIN = "ADMIN",
  STAFF = "STAFF",
  TECHNICIAN = "TECHNICIAN",
  DISPATCHER = "DISPATCHER",
  CUSTOMER = "CUSTOMER",
}

// ProficiencyLevel ENUM
export enum ProficiencyLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "BEGINNER",
  EXPERT = "EXPERT",
}

// Equipment Status 
export enum EquipmentStatus {
  AVAILABLE = "AVAILABLE",
  IN_USE = "IN_USE",
  UNDER_MAINTENANCE = "UNDER_MAINTENANCE",
  DAMAGED = "DAMAGED"
}

export enum AssetStatus {
  OPERATIONAL = "OPERATIONAL",
  NEEDS_MAINTENANCE = "NEEDS_MAINTENANCE",
  UNDER_REPAIR = "UNDER_REPAIR",
  DECOMMISSIONED = "DECOMMISSIONED"
}


// Date Time
export interface IDateTime {
  date_time: string;
}

export class DateTime implements IDateTime {
  date_time: string;
  constructor(data: IDateTime) {
    this.date_time = data.date_time;
  }
}