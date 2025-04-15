"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRegister = exports.Login = void 0;
const joi_1 = __importDefault(require("joi"));
// User Login API Validation Schema
exports.Login = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().required().messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
        password: joi_1.default.string().min(6).required().messages({
            'string.min': 'Password must be at least 6 characters',
            'any.required': 'Password is required'
        })
    })
};
// Organization User Registration API Validation Schema
exports.authRegister = {
    body: joi_1.default.object({
        email: joi_1.default.string().required().messages({
            'any.required': 'Email is required'
        }),
        organization_id: joi_1.default.number().required().messages({
            'any.required': 'Organization id is required'
        }),
        isVerified_Email: joi_1.default.boolean().required().messages({
            'any.required': 'Is Verified Email is required'
        }),
        isVerified_PhoneNumber: joi_1.default.boolean().required().messages({
            'any.required': 'Is Verified Phone Number is required'
        }),
        first_name: joi_1.default.string().required().messages({
            'any.required': 'First name is required'
        }),
        last_name: joi_1.default.string().required().messages({
            'any.required': 'Last name is required'
        }),
        phone: joi_1.default.string().required().messages({
            'any.required': 'Phone is required'
        }),
        job_title: joi_1.default.string().required().messages({
            'any.required': 'Job title is required'
        }),
        user_type: joi_1.default.string().required().messages({
            'any.required': 'User type is required'
        }),
        is_active: joi_1.default.number().required().messages({
            'any.required': 'Is active is required'
        }),
        email_verified: joi_1.default.boolean().required().messages({
            'any.required': 'Email verified is required'
        }),
        created_at: joi_1.default.string().required().messages({
            'any.required': 'Created at is required'
        }),
        updated_at: joi_1.default.string().required().messages({
            'any.required': 'Updated at is required'
        }),
    })
};
