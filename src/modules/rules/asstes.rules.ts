import Joi from "joi";

// Create Asset Validation
export const CreateAssetValidation = {
  body: Joi.object({
    organization_id: Joi.number().required().messages({
      "any.required": "Organization id is required",
      "number.base": "Organization id must be a number",
    }),
    customer_id: Joi.number().required().messages({
      "any.required": "Customer id is required",
      "number.base": "Customer id must be a number",
    }),
    asset_name: Joi.string().required().messages({
      "any.required": "Asset name is required",
      "string.base": "Asset name must be a string",
    }),
    serial_number: Joi.string().required().messages({
      "any.required": "Serial number is required",
      "string.base": "Serial number must be a string",
    }),
    model: Joi.string().required().messages({
      "any.required": "Model is required",
      "string.base": "Model must be a string",
    }),
    manufacturer: Joi.string().required().messages({
      "any.required": "Manufacturer is required",
      "string.base": "Manufacturer must be a string",
    }),
    status: Joi.string().required().messages({
      "any.required": "Status is required",
      "string.base": "Status must be a string",
    }),
    location: Joi.string().required().messages({
      "any.required": "Location is required",
      "string.base": "Location must be a string",
    }),
    notes: Joi.string().required().messages({
      "any.required": "Notes is required",
      "string.base": "Notes must be a string",
    }),
    purchase_date: Joi.string().required().messages({
      "any.required": "Purchase date is required",
      "string.base": "Purchase date must be a string",
    }),
    warranty_expiry: Joi.string().required().messages({
      "any.required": "Warranty expiry is required",
      "string.base": "Warranty expiry must be a string",
    }),
  }),
};

// Update Asset Validation
export const UpdateAssetValidation = {
  body: Joi.object({
    organization_id: Joi.number().required().messages({
      "any.required": "Organization id is required",
      "number.base": "Organization id must be a number",
    }),
    customer_id: Joi.number().required().messages({
      "any.required": "Customer id is required",
      "number.base": "Customer id must be a number",
    }),
    asset_name: Joi.string().required().messages({
      "any.required": "Asset name is required",
      "string.base": "Asset name must be a string",
    }),
    serial_number: Joi.string().required().messages({
      "any.required": "Serial number is required",
      "string.base": "Serial number must be a string",
    }),
    model: Joi.string().required().messages({
      "any.required": "Model is required",
      "string.base": "Model must be a string",
    }),
    manufacturer: Joi.string().required().messages({
      "any.required": "Manufacturer is required",
      "string.base": "Manufacturer must be a string",
    }),
    status: Joi.string().required().messages({
      "any.required": "Status is required",
      "string.base": "Status must be a string",
    }),
    location: Joi.string().required().messages({
      "any.required": "Location is required",
      "string.base": "Location must be a string",
    }),
    notes: Joi.string().required().messages({
      "any.required": "Notes is required",
      "string.base": "Notes must be a string",
    }),
    purchase_date: Joi.string().required().messages({
      "any.required": "Purchase date is required",
      "string.base": "Purchase date must be a string",
    }),
    warranty_expiry: Joi.string().required().messages({
      "any.required": "Warranty expiry is required",
      "string.base": "Warranty expiry must be a string",
    }),
  }),
};
