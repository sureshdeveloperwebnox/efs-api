import Joi from "joi";

// Create Company Validation
export const CreateCompanyValidation = {
  body: Joi.object({
    organization_id: Joi.number().required().messages({
      "any.required": "Organization ID is required",
      "number.base": "Organization ID must be a number",
    }),
    name: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.base": "Name must be a string",
    }),
    industry: Joi.string().required().messages({
      "any.required": "Industry is required",
      "string.base": "Industry must be a string",
    }),
    tax_id: Joi.string().required().messages({
      "any.required": "Tax ID is required",
      "string.base": "Tax ID must be a string",
    }),
    address: Joi.string().required().messages({
      "any.required": "Address is required",
      "string.base": "Address must be a string",
    }),
    phone: Joi.string().required().messages({
      "any.required": "Phone is required",
      "string.base": "Phone must be a string",
    }),
    email: Joi.string().required().messages({
      "any.required": "Email is required",
      "string.base": "Email must be a string",
    }),
    website: Joi.string().required().messages({
      "any.required": "Website is required",
      "string.base": "Website must be a string",
    }),
    created_at: Joi.string().required().messages({
      "any.required": "Created at is required",
      "string.base": "Created at must be a string",
    }),
  }),
};

// Update Company Validation
export const UpdateCompanyValidation = {
  body: Joi.object({
    organization_id: Joi.number().required().messages({
      "any.required": "Organization ID is required",
      "number.base": "Organization ID must be a number",
    }),
    name: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.base": "Name must be a string",
    }),
    industry: Joi.string().required().messages({
      "any.required": "Industry is required",
      "string.base": "Industry must be a string",
    }),
    tax_id: Joi.string().required().messages({
      "any.required": "Tax ID is required",
      "string.base": "Tax ID must be a string",
    }),
    address: Joi.string().required().messages({
      "any.required": "Address is required",
      "string.base": "Address must be a string",
    }),
    phone: Joi.string().required().messages({
      "any.required": "Phone is required",
      "string.base": "Phone must be a string",
    }),
    email: Joi.string().required().messages({
      "any.required": "Email is required",
      "string.base": "Email must be a string",
    }),
    website: Joi.string().required().messages({
      "any.required": "Website is required",
      "string.base": "Website must be a string",
    }),
    created_at: Joi.string().required().messages({
      "any.required": "Created at is required",
      "string.base": "Created at must be a string",
    }),
  }),
};
