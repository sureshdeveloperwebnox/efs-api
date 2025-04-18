import { UserRole } from "./main.model";

// Create User Model
export interface ICreateUser {
  id: BigInt;
  organization_id: BigInt;
  email: string;
  password_hash: string;
  isVerified_Email: boolean;
  isVerified_PhoneNumber: boolean;
  first_name: string;
  last_name: string;
  phone: string;
  job_title: string;
  user_type: UserRole;
  is_active: number;
  last_login_at: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}
export class CreateUser implements ICreateUser {
  id: BigInt;
  organization_id: BigInt;
  email: string;
  password_hash: string;
  isVerified_Email: boolean;
  isVerified_PhoneNumber: boolean;
  first_name: string;
  last_name: string;
  phone: string;
  job_title: string;
  user_type: UserRole;
  is_active: number;
  last_login_at: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;

  constructor(data: ICreateUser) {
    if (!Object.values(UserRole).includes(data.user_type)) {
      throw new Error("Invalid user type");
    }
    this.id = data.id;
    this.organization_id = data.organization_id;
    this.email = data.email;
    this.password_hash = data.password_hash;
    this.isVerified_Email = data.isVerified_Email;
    this.isVerified_PhoneNumber = data.isVerified_PhoneNumber;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.phone = data.phone;
    this.job_title = data.job_title;
    this.user_type = data.user_type;
    this.is_active = data.is_active;
    this.last_login_at = data.last_login_at;
    this.email_verified = data.email_verified;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}

// Edit User Model
export interface IEditUser {
  id: BigInt;
  organization_id: BigInt;
  email: string;
  password_hash: string;
  isVerified_Email: boolean;
  isVerified_PhoneNumber: boolean;
  first_name: string;
  last_name: string;
  phone: string;
  job_title: string;
  user_type: UserRole;
  is_active: number;
  last_login_at: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export class EditUser implements IEditUser {
  id: BigInt;
  organization_id: BigInt;
  email: string;
  password_hash: string;
  isVerified_Email: boolean;
  isVerified_PhoneNumber: boolean;
  first_name: string;
  last_name: string;
  phone: string;
  job_title: string;
  user_type: UserRole;
  is_active: number;
  last_login_at: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;

  constructor(data: IEditUser) {
    if (!Object.values(UserRole).includes(data.user_type)) {
      throw new Error("Invalid user type");
    }
    this.id = data.id;
    this.organization_id = data.organization_id;
    this.email = data.email;
    this.password_hash = data.password_hash;
    this.isVerified_Email = data.isVerified_Email;
    this.isVerified_PhoneNumber = data.isVerified_PhoneNumber;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.phone = data.phone;
    this.job_title = data.job_title;
    this.user_type = data.user_type;
    this.is_active = data.is_active;
    this.last_login_at = data.last_login_at;
    this.email_verified = data.email_verified;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}
