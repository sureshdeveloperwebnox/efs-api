import Joi from "joi";

// Create Organization Validation Schema
export const CreateOrganizationValidation = {
  body: Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
    email: Joi.string().required().messages({
      "any.required": "Email is required",
    }),
    phone: Joi.string().required().messages({
      "any.required": "Phone is required",
    }),
    address: Joi.string().required().messages({
      "any.required": "Address is required",
    }),
    organization_name: Joi.string().required().messages({
      "any.required": "Organization name is required",
    }),
    industry_name: Joi.string().required().messages({
      "any.required": "Industry name is required",
    }),
    pincode: Joi.string().required().messages({
      "any.required": "Pincode is required",
    }),
    website: Joi.optional().messages({
      "any.required": "Website is required",
    }),
    timezone: Joi.optional().messages({
      "any.required": "Timezone is required",
    }),
    plan_type: Joi.string().required().messages({
      "any.required": "Plan type is required",
    }),
    subscription_start_date: Joi.string().required().messages({
      "any.required": "Subscription start date is required",
    }),
    subscription_end_date: Joi.string().required().messages({
      "any.required": "Subscription end date is required",
    }),
    currencyid: Joi.number().required().messages({
      "any.required": "Currency id is required",
    }),
    file_storage_limit: Joi.number().required().messages({
      "any.required": "File storage limit is required",
    }),
    data_storage_limit: Joi.number().required().messages({
      "any.required": "Data storage limit is required",
    }),
    created_at: Joi.optional().messages({
      "any.required": "Created at is required",
    }),
    updated_at: Joi.optional().messages({
      "any.required": "Updated at is required",
    }),
  }),
};

// Update Organization Validation Schema
export const UpdateOrganizationValidation = {
  body: Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
    email: Joi.string().required().messages({
      "any.required": "Email is required",
    }),
    phone: Joi.string().required().messages({
      "any.required": "Phone is required",
    }),
    address: Joi.string().required().messages({
      "any.required": "Address is required",
    }),
    organization_name: Joi.string().required().messages({
      "any.required": "Organization name is required",
    }),
    industry_name: Joi.string().required().messages({
      "any.required": "Industry name is required",
    }),
    pincode: Joi.string().required().messages({
      "any.required": "Pincode is required",
    }),
    website: Joi.optional().messages({
      "any.required": "Website is required",
    }),
    timezone: Joi.optional().messages({
      "any.required": "Timezone is required",
    }),
    plan_type: Joi.string().required().messages({
      "any.required": "Plan type is required",
    }),
    subscription_start_date: Joi.string().required().messages({
      "any.required": "Subscription start date is required",
    }),
    subscription_end_date: Joi.string().required().messages({
      "any.required": "Subscription end date is required",
    }),
    currencyid: Joi.number().required().messages({
      "any.required": "Currency id is required",
    }),
    file_storage_limit: Joi.number().required().messages({
      "any.required": "File storage limit is required",
    }),
    data_storage_limit: Joi.number().required().messages({
      "any.required": "Data storage limit is required",
    }),
    created_at: Joi.optional().messages({
      "any.required": "Created at is required",
    }),
    updated_at: Joi.optional().messages({
      "any.required": "Updated at is required",
    }),
  }),
};