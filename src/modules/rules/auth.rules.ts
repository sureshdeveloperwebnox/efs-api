import Joi from "joi";

// User Login Validation Schema
export const Login = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required",
    }),
  }),
};

// Organization User Registration API Validation Schema
export const OrganizationUserRegisterValidation = {
  body: Joi.object({
    email: Joi.string().required().messages({
      "any.required": "Email is required",
      "string.base": "Email must be a string",
    }),
    organization_id: Joi.number().required().messages({
      "any.required": "Organization id is required",
      "number.base": "Organization id must be a number",
    }),
    isVerified_Email: Joi.boolean().required().messages({
      "any.required": "IsVerified Email is required",
      "boolean.base": "IsVerified Email must be a boolean",
    }),
    isVerified_PhoneNumber: Joi.boolean().required().messages({
      "any.required": "isVerified_PhoneNumber is required",
      "boolean.base": "isVerified_PhoneNumber must be a boolean",
    }),
    first_name: Joi.string().required().messages({
      "any.required": "First name is required",
      "string.base": "First name must be a string",
    }),
    last_name: Joi.string().required().messages({
      "any.required": "Last name is required",
      "string.base": "Last name must be a string",
    }),
    phone: Joi.string().required().messages({
      "any.required": "Phone is required",
      "string.base": "Phone must be a string",
    }),
    job_title: Joi.string().required().messages({
      "any.required": "Job title is required",
      "string.base": "Job title must be a string",
    }),
    user_type: Joi.string().required().messages({
      "any.required": "User type is required",
      "string.base": "User type must be a string",
    }),
    is_active: Joi.number().required().messages({
      "any.required": "Is active is required",
      "number.base": "Is active must be a number",
    }),
    email_verified: Joi.boolean().required().messages({
      "any.required": "Email verified is required",
      "boolean.base": "Email verified must be a boolean",
    }),
    created_at: Joi.string().required().messages({
      "any.required": "Created_at is required",
      "string.base": "Created_at must be a string",
    })
  }),
};
