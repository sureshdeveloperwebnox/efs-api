
// Create Company Model
export interface ICreateCompany {
  organization_id: bigint;
  name: string;
  industry: string;
  tax_id: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  date_time: string;
};

export class CreateCompany implements ICreateCompany {
  organization_id: bigint;
  name: string;
  industry: string;
  tax_id: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  date_time: string;

  constructor(data: ICreateCompany) {
    this.organization_id = data.organization_id;
    this.name = data.name;
    this.industry = data.industry;
    this.tax_id = data.tax_id;
    this.address = data.address;
    this.phone = data.phone;
    this.email = data.email;
    this.website = data.website;
    this.date_time = data.date_time;
  }
};


// Update Company Model
export interface IUpdateCompany {
    id: bigint;
    organization_id: bigint;
    name: string;
    industry: string;
    tax_id: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    date_time: string;
  };
  
  export class UpdateCompany implements IUpdateCompany {
    id: bigint;
    organization_id: bigint;
    name: string;
    industry: string;
    tax_id: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    date_time: string;
  
    constructor(data: IUpdateCompany) {
      this.id = data.id;
      this.organization_id = data.organization_id;
      this.name = data.name;
      this.industry = data.industry;
      this.tax_id = data.tax_id;
      this.address = data.address;
      this.phone = data.phone;
      this.email = data.email;
      this.website = data.website;
      this.date_time = data.date_time;
    }
  };