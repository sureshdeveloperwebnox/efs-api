import Joi from "joi";

// Create Customer Validation
export const CreateCustomerValidation = {
  body: Joi.object({
    organization_id: Joi.number().required().messages({
      "any.required": "Organization ID is required",
      "number.base": "Organization ID must be a number",
    }),
    company_id: Joi.number().required().messages({
      "any.required": "Company ID is required",
      "number.base": "Company ID must be a number",
    }),
    first_name: Joi.string().required().messages({
      "any.required": "First name is required",
      "string.base": "First name must be a string",
    }),
    last_name: Joi.string().required().messages({
      "any.required": "Last name is required",
      "string.base": "Last name must be a string",
    }),
    email: Joi.string().required().messages({
      "any.required": "Email is required",
      "string.base": "Email must be a string",
    }),
    phone: Joi.string().required().messages({
      "any.required": "Phone is required",
      "string.base": "Phone must be a string",
    }),
    address: Joi.string().required().messages({
      "any.required": "Address is required",
      "string.base": "Address must be a string",
    }),
    is_active: Joi.number().required().messages({
      "any.required": "Is active ID is required",
      "number.base": "Is active must be a number",
    }),
    created_at: Joi.string().required().messages({
      "any.required": "Created at is required",
      "string.base": "Created at must be a string",
    }),
  }),
};

// Update Customer Validation
export const UpdateCustomerValidation = {
  body: Joi.object({
    organization_id: Joi.number().required().messages({
      "any.required": "Organization ID is required",
      "number.base": "Organization ID must be a number",
    }),
    company_id: Joi.number().required().messages({
      "any.required": "Company ID is required",
      "number.base": "Company ID must be a number",
    }),
    first_name: Joi.string().required().messages({
      "any.required": "First name is required",
      "string.base": "First name must be a string",
    }),
    last_name: Joi.string().required().messages({
      "any.required": "Last name is required",
      "string.base": "Last name must be a string",
    }),
    email: Joi.string().required().messages({
      "any.required": "Email is required",
      "string.base": "Email must be a string",
    }),
    phone: Joi.string().required().messages({
      "any.required": "Phone is required",
      "string.base": "Phone must be a string",
    }),
    address: Joi.string().required().messages({
      "any.required": "Address is required",
      "string.base": "Address must be a string",
    }),
    is_active: Joi.number().required().messages({
      "any.required": "Is active ID is required",
      "number.base": "Is active must be a number",
    }),
    created_at: Joi.string().required().messages({
      "any.required": "Created at is required",
      "string.base": "Created at must be a string",
    }),
  }),
};
