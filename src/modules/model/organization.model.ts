// Plantype for organization user
export enum PlanType {
  FREE = 'FREE',
  STANDARD = 'STANDARD',
  PROFESSIONAL = 'PROFESSIONAL'
}

// Organization Models

// Create Organization Model
export interface IOrganization {
  name: string;
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
  phone: string;
  address: string;
  organization_name: string;
  industry_name: string;
  pincode: string;
  website: string;
  timezone: string;
  plan_type: PlanType;
  subscription_start_date: string;
  subscription_end_date: string;
  currencyid: number;
  file_storage_limit: bigint;
  data_storage_limit: bigint;
  created_at: string;
  updated_at: string;
}
export class Organization implements IOrganization {
  name: string;
  last_name: string;
  job_title: string;
  email: string;
  phone: string;
  address: string;
  organization_name: string;
  industry_name: string;
  first_name: string;
  pincode: string;
  website: string;
  timezone: string;
  plan_type: PlanType;
  subscription_start_date: string;
  subscription_end_date: string;
  currencyid: number;
  file_storage_limit: bigint;
  data_storage_limit: bigint;
  created_at: string;
  updated_at: string;

  constructor(data: IOrganization) {
    this.name = data.name;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.job_title = data.job_title;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.organization_name = data.organization_name;
    this.industry_name = data.industry_name;
    this.pincode = data.pincode;
    this.website = data.website;
    this.timezone = data.timezone;
    this.plan_type = data.plan_type;
    this.subscription_start_date = data.subscription_start_date;
    this.subscription_end_date = data.subscription_end_date;
    this.currencyid = data.currencyid;
    this.file_storage_limit = data.file_storage_limit;
    this.data_storage_limit = data.data_storage_limit;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}

// Edit Organization Model
export interface IEditOrganization {
  id: bigint,
  name: string;
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
  phone: string;
  address: string;
  organization_name: string;
  industry_name: string;
  pincode: string;
  website: string;
  timezone: string;
  plan_type: PlanType;
  subscription_start_date: string;
  subscription_end_date: string;
  currencyid: number;
  file_storage_limit: bigint;
  data_storage_limit: bigint;
  created_at: string;
  updated_at: string;
}
export class EditOrganization implements IEditOrganization {
  name: string;
  id: bigint;
  last_name: string;
  job_title: string;
  email: string;
  phone: string;
  address: string;
  organization_name: string;
  industry_name: string;
  first_name: string;
  pincode: string;
  website: string;
  timezone: string;
  plan_type: PlanType;
  subscription_start_date: string;
  subscription_end_date: string;
  currencyid: number;
  file_storage_limit: bigint;
  data_storage_limit: bigint;
  created_at: string;
  updated_at: string;

  constructor(data: IEditOrganization) {
    this.id = data.id;
    this.name = data.name;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.job_title = data.job_title;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.organization_name = data.organization_name;
    this.industry_name = data.industry_name;
    this.pincode = data.pincode;
    this.website = data.website;
    this.timezone = data.timezone;
    this.plan_type = data.plan_type;
    this.subscription_start_date = data.subscription_start_date;
    this.subscription_end_date = data.subscription_end_date;
    this.currencyid = data.currencyid;
    this.file_storage_limit = data.file_storage_limit;
    this.data_storage_limit = data.data_storage_limit;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}


