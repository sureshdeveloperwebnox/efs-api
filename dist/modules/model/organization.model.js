"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditOrganization = exports.Organization = exports.PlanType = void 0;
// Plantype for organization user
var PlanType;
(function (PlanType) {
    PlanType["FREE"] = "FREE";
    PlanType["STANDARD"] = "STANDARD";
    PlanType["PROFESSIONAL"] = "PROFESSIONAL";
})(PlanType || (exports.PlanType = PlanType = {}));
class Organization {
    constructor(data) {
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
exports.Organization = Organization;
class EditOrganization {
    constructor(data) {
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
exports.EditOrganization = EditOrganization;
