"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrganizationValidation = exports.CreateOrganizationValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// Create Organization Validation Schema
exports.CreateOrganizationValidation = {
    body: joi_1.default.object({
        name: joi_1.default.string().required().messages({
            "any.required": "Name is required",
            "string.base": "Name must be a string",
        }),
        email: joi_1.default.string().required().messages({
            "any.required": "Email is required",
            "string.base": "Email must be a string",
        }),
        phone: joi_1.default.string().required().messages({
            "any.required": "Phone is required",
            "string.base": "Phone must be a string",
        }),
        address: joi_1.default.string().required().messages({
            "any.required": "Address is required",
            "string.base": "Address must be a string",
        }),
        organization_name: joi_1.default.string().required().messages({
            "any.required": "Organization name is required",
            "string.base": "Organization name must be a string",
        }),
        industry_name: joi_1.default.string().required().messages({
            "any.required": "Industry name is required",
            "string.base": "Industry name must be a string",
        }),
        pincode: joi_1.default.string().required().messages({
            "any.required": "Pincode is required",
            "string.base": "Pincode must be a string",
        }),
        website: joi_1.default.optional().messages({
            "any.required": "Website is required",
            "string.base": "Website must be a string",
        }),
        timezone: joi_1.default.optional().messages({
            "any.required": "Timezone is required",
            "string.base": "Timezone must be a string",
        }),
        plan_type: joi_1.default.string().required().messages({
            "any.required": "Plan type is required",
            "string.base": "Plan type must be a string",
        }),
        subscription_start_date: joi_1.default.string().required().messages({
            "any.required": "Subscription start date is required",
            "string.base": "Subscription start date must be a string",
        }),
        subscription_end_date: joi_1.default.string().required().messages({
            "any.required": "Subscription end date is required",
            "string.base": "Subscription end date must be a string",
        }),
        currencyid: joi_1.default.number().required().messages({
            "any.required": "Currency id is required",
            "number.base": "Currency id must be a number",
        }),
        file_storage_limit: joi_1.default.number().required().messages({
            "any.required": "File storage limit is required",
            "number.base": "File storage limit must be a number",
        }),
        data_storage_limit: joi_1.default.number().required().messages({
            "any.required": "Data storage limit is required",
            "number.base": "Data storage limit must be a number",
        }),
        created_at: joi_1.default.optional().messages({
            "any.required": "Created at is required",
            "string.base": "Created at must be a string",
        }),
    }),
};
// Update Organization Validation Schema
exports.UpdateOrganizationValidation = {
    body: joi_1.default.object({
        id: joi_1.default.string().required().messages({
            "any.required": "ID is required",
            "number.base": "ID must be a number",
        }),
        name: joi_1.default.string().required().messages({
            "any.required": "Name is required",
        }),
        email: joi_1.default.string().required().messages({
            "any.required": "Email is required",
        }),
        phone: joi_1.default.string().required().messages({
            "any.required": "Phone is required",
        }),
        address: joi_1.default.string().required().messages({
            "any.required": "Address is required",
        }),
        organization_name: joi_1.default.string().required().messages({
            "any.required": "Organization name is required",
        }),
        industry_name: joi_1.default.string().required().messages({
            "any.required": "Industry name is required",
        }),
        pincode: joi_1.default.string().required().messages({
            "any.required": "Pincode is required",
        }),
        website: joi_1.default.optional().messages({
            "any.required": "Website is required",
        }),
        timezone: joi_1.default.optional().messages({
            "any.required": "Timezone is required",
        }),
        plan_type: joi_1.default.string().required().messages({
            "any.required": "Plan type is required",
        }),
        subscription_start_date: joi_1.default.optional().messages({
            "any.required": "Subscription start date is required",
        }),
        subscription_end_date: joi_1.default.optional().messages({
            "any.required": "Subscription end date is required",
        }),
        currencyid: joi_1.default.number().required().messages({
            "any.required": "Currency id is required",
        }),
        file_storage_limit: joi_1.default.number().required().messages({
            "any.required": "File storage limit is required",
        }),
        data_storage_limit: joi_1.default.number().required().messages({
            "any.required": "Data storage limit is required",
        }),
        created_at: joi_1.default.optional().messages({
            "any.required": "Created at is required",
        }),
        updated_at: joi_1.default.optional().messages({
            "any.required": "Updated at is required",
        }),
    }),
};
