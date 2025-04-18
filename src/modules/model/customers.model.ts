// Create Customer Model
export interface ICreateCustomer {
  organization_id: bigint;
  company_id: bigint;
  first_name: string;
  last_name: string;
  job_title: string;
  isVerified_Email: boolean;
  isVerified_PhoneNumber: boolean;
  email: string;
  phone: string;
  address: string;
  is_active: number;
  email_verified: boolean;
  created_at: string;
}

export class CreateCustomer implements ICreateCustomer {
  organization_id: bigint;
  company_id: bigint;
  first_name: string;
  last_name: string;
  job_title: string;
  isVerified_Email: boolean;
  isVerified_PhoneNumber: boolean;
  email: string;
  phone: string;
  address: string;
  is_active: number;
  email_verified: boolean;
  created_at: string;

  constructor(data: ICreateCustomer) {
    this.organization_id = data.organization_id;
    this.company_id = data.company_id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.job_title = data.job_title;
    this.isVerified_Email = data.isVerified_Email;
    this.isVerified_PhoneNumber = data.isVerified_PhoneNumber;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.is_active = data.is_active;
    this.email_verified = data.email_verified;
    this.created_at = data.created_at;
  }
}

// Update Customer Model
export interface IUpdateCustomer {
  id: bigint;
  organization_id: bigint;
  company_id: bigint;
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
  phone: string;
  address: string;
  is_active: number;
  created_at: string;
}

export class UpdateCustomer implements IUpdateCustomer {
  id: bigint;
  organization_id: bigint;
  company_id: bigint;
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
  phone: string;
  address: string;
  is_active: number;
  created_at: string;

  constructor(data: IUpdateCustomer) {
    this.id = data.id;
    this.organization_id = data.organization_id;
    this.company_id = data.company_id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.job_title = data.job_title;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.is_active = data.is_active;
    this.created_at = data.created_at;
  }
}
