"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationUserRegisterValidation = exports.Login = void 0;
const joi_1 = __importDefault(require("joi"));
// User Login Validation Schema
exports.Login = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().required().messages({
            "string.email": "Please provide a valid email address",
            "any.required": "Email is required",
        }),
        password: joi_1.default.string().min(6).required().messages({
            "string.min": "Password must be at least 6 characters",
            "any.required": "Password is required",
        }),
    }),
};
// Organization User Registration API Validation Schema
exports.OrganizationUserRegisterValidation = {
    body: joi_1.default.object({
        email: joi_1.default.string().required().messages({
            "any.required": "Email is required",
            "string.base": "Email must be a string",
        }),
        organization_id: joi_1.default.number().required().messages({
            "any.required": "Organization id is required",
            "number.base": "Organization id must be a number",
        }),
        isVerified_Email: joi_1.default.boolean().required().messages({
            "any.required": "IsVerified Email is required",
            "boolean.base": "IsVerified Email must be a boolean",
        }),
        isVerified_PhoneNumber: joi_1.default.boolean().required().messages({
            "any.required": "isVerified_PhoneNumber is required",
            "boolean.base": "isVerified_PhoneNumber must be a boolean",
        }),
        first_name: joi_1.default.string().required().messages({
            "any.required": "First name is required",
            "string.base": "First name must be a string",
        }),
        last_name: joi_1.default.string().required().messages({
            "any.required": "Last name is required",
            "string.base": "Last name must be a string",
        }),
        phone: joi_1.default.string().required().messages({
            "any.required": "Phone is required",
            "string.base": "Phone must be a string",
        }),
        job_title: joi_1.default.string().required().messages({
            "any.required": "Job title is required",
            "string.base": "Job title must be a string",
        }),
        user_type: joi_1.default.string().required().messages({
            "any.required": "User type is required",
            "string.base": "User type must be a string",
        }),
        is_active: joi_1.default.number().required().messages({
            "any.required": "Is active is required",
            "number.base": "Is active must be a number",
        }),
        email_verified: joi_1.default.boolean().required().messages({
            "any.required": "Email verified is required",
            "boolean.base": "Email verified must be a boolean",
        }),
        created_at: joi_1.default.string().required().messages({
            "any.required": "Created_at is required",
            "string.base": "Created_at must be a string",
        })
    }),
};
