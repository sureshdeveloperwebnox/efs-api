"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUser = exports.CreateUser = void 0;
const main_model_1 = require("./main.model");
class CreateUser {
    constructor(data) {
        if (!Object.values(main_model_1.UserRole).includes(data.user_type)) {
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
exports.CreateUser = CreateUser;
class EditUser {
    constructor(data) {
        if (!Object.values(main_model_1.UserRole).includes(data.user_type)) {
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
exports.EditUser = EditUser;
