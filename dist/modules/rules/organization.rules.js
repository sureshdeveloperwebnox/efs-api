"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationDetails = exports.organizationRegister = void 0;
const joi_1 = __importDefault(require("joi"));
exports.organizationRegister = {
    body: joi_1.default.object({
        name: joi_1.default.string().required().messages({
            'any.required': 'Name is required'
        }),
        email: joi_1.default.string().required().messages({
            'any.required': 'Email is required'
        }),
        phone: joi_1.default.string().required().messages({
            'any.required': 'Phone is required'
        }),
        address: joi_1.default.string().required().messages({
            'any.required': 'Address is required'
        }),
        organization_name: joi_1.default.string().required().messages({
            'any.required': 'Organization name is required'
        }),
        industry_name: joi_1.default.string().required().messages({
            'any.required': 'Industry name is required'
        }),
        pincode: joi_1.default.string().required().messages({
            'any.required': 'Pincode is required'
        }),
        website: joi_1.default.optional().messages({
            'any.required': 'Website is required'
        }),
        timezone: joi_1.default.optional().messages({
            'any.required': 'Timezone is required'
        }),
        plan_type: joi_1.default.string().required().messages({
            'any.required': 'Plan type is required'
        }),
        subscription_start_date: joi_1.default.string().required().messages({
            'any.required': 'Subscription start date is required'
        }),
        subscription_end_date: joi_1.default.string().required().messages({
            'any.required': 'Subscription end date is required'
        }),
        currencyid: joi_1.default.number().required().messages({
            'any.required': 'Currency id is required'
        }),
        file_storage_limit: joi_1.default.number().required().messages({
            'any.required': 'File storage limit is required'
        }),
        data_storage_limit: joi_1.default.number().required().messages({
            'any.required': 'Data storage limit is required'
        }),
        created_at: joi_1.default.optional().messages({
            'any.required': 'Created at is required'
        }),
        updated_at: joi_1.default.optional().messages({
            'any.required': 'Updated at is required'
        }),
    })
};
exports.organizationDetails = {
    params: joi_1.default.object({
        id: joi_1.default.string().required().messages({
            'any.required': 'Id is required'
        })
    })
};
