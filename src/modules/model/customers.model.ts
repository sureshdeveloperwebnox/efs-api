// Create Customer Model
export interface ICreateCustomer {
  organization_id: bigint;
  company_id: bigint;
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  date_time: string;
}

export class CreateCustomer implements ICreateCustomer {
  organization_id: bigint;
  company_id: bigint;
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  date_time: string;

  constructor(data: ICreateCustomer) {
    this.organization_id = data.organization_id;
    this.company_id = data.company_id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.job_title = data.job_title;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.password = data.password;
    this.date_time = data.date_time;
  }
}

// Update Customer Model
export interface IUpdateCustomer {
  id: bigint;
  user_id: bigint;
  organization_id: bigint;
  company_id: bigint;
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
  phone: string;
  address: string;
  date_time: string;
}

export class UpdateCustomer implements IUpdateCustomer {
  id: bigint;
  user_id: bigint;
  organization_id: bigint;
  company_id: bigint;
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
  phone: string;
  address: string;
  date_time: string;

  constructor(data: IUpdateCustomer) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.organization_id = data.organization_id;
    this.company_id = data.company_id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.job_title = data.job_title;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.date_time = data.date_time;
  }
}
