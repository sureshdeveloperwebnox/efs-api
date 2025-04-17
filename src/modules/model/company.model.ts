
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
  created_at: string;
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
  created_at: string;

  constructor(data: ICreateCompany) {
    this.organization_id = data.organization_id;
    this.name = data.name;
    this.industry = data.industry;
    this.tax_id = data.tax_id;
    this.address = data.address;
    this.phone = data.phone;
    this.email = data.email;
    this.website = data.website;
    this.created_at = data.created_at;
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
    created_at: string;
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
    created_at: string;
  
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
      this.created_at = data.created_at;
    }
  };